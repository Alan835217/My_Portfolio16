import express from 'express';
import sqlite3 from 'sqlite3';
const { Database } = sqlite3;
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, 'database/portfolio.db');
const db = new Database(dbPath, (err) => {
    if (err) console.error('Error opening database', err.message);
    else {
        console.log('Connected to the SQLite database.');
        createTables();
    }
});

function createTables() {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS about (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            image_url TEXT,
            github TEXT,
            linkedin TEXT,
            email TEXT
        )`);

        // Migration for existing databases
        ['github', 'linkedin', 'email'].forEach(col => {
            db.run(`ALTER TABLE about ADD COLUMN ${col} TEXT`, (err) => {});
        });

        db.run(`CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            category TEXT,
            icon TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            image_url TEXT,
            link TEXT,
            tech_stack TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS education (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            degree TEXT,
            institution TEXT,
            year TEXT,
            description TEXT
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )`);

        // Insert default user if not exists
        db.get(`SELECT * FROM users WHERE username = 'admin'`, async (err, row) => {
            if (!row) {
                const hashedPassword = await bcrypt.hash('password123', 10);
                db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
                console.log('Default admin user created: admin / password123');
            }
        });

        // Insert default settings if not exists
        const defaultSettings = [
            ['show_about', 'true'],
            ['show_skills', 'true'],
            ['show_projects', 'true'],
            ['show_education', 'true']
        ];
        defaultSettings.forEach(([key, value]) => {
            db.run(`INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`, [key, value]);
        });

        // Insert dummy data if table is empty
        db.get(`SELECT COUNT(*) as count FROM about`, (err, row) => {
            if (row && row.count === 0) {
                db.run(`INSERT INTO about (title, description) VALUES (?, ?)`, 
                    ['Full Stack Developer', 'I build modern and responsive web applications with a focus on user experience and performance.']);
            }
        });
    });
}

// Routes
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

app.get('/api/content', (req, res) => {
    console.log('GET /api/content requested');
    const content = {};
    db.serialize(() => {
        db.get(`SELECT * FROM about LIMIT 1`, (err, about) => {
            content.about = about || {};
            db.all(`SELECT * FROM skills`, (err, skills) => {
                content.skills = skills || [];
                db.all(`SELECT * FROM projects`, (err, projects) => {
                    content.projects = projects || [];
                    db.all(`SELECT * FROM education`, (err, education) => {
                        content.education = education || [];
                        db.all(`SELECT * FROM settings`, (err, settings) => {
                            content.settings = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value === 'true' }), {});
                            console.log('Content fetched successfully:', { aboutTitle: content.about?.title, hasSocials: !!(content.about?.github || content.about?.linkedin || content.about?.email) });
                            res.json(content);
                        });
                    });
                });
            });
        });
    });
});

app.get('/api/about', (req, res) => {
    db.get(`SELECT * FROM about`, (err, row) => res.json(row || {}));
});

app.get('/api/skills', (req, res) => {
    db.all(`SELECT * FROM skills`, (err, rows) => res.json(rows || []));
});

app.get('/api/projects', (req, res) => {
    db.all(`SELECT * FROM projects`, (err, rows) => res.json(rows || []));
});

app.get('/api/education', (req, res) => {
    db.all(`SELECT * FROM education`, (err, rows) => res.json(rows || []));
});

app.get('/api/debug-db', (req, res) => {
    db.all(`SELECT * FROM about`, (err, rows) => {
        res.json(rows);
    });
});

app.post('/api/settings', (req, res) => {
    const { key, value } = req.body;
    db.run(`UPDATE settings SET value = ? WHERE key = ?`, [String(value), key], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

app.post('/api/update-about', (req, res) => {
    const { title, description, github, linkedin, email } = req.body;
    console.log('UPDATING ABOUT (Received):', { title, description, github, linkedin, email });
    
    // Use a subquery to target the first row regardless of ID
    const query = `UPDATE about SET title = ?, description = ?, github = ?, linkedin = ?, email = ? WHERE id = (SELECT id FROM about LIMIT 1)`;
    
    db.run(query, [title, description, github, linkedin, email], function(err) {
        if (err) {
            console.error('DATABASE UPDATE ERROR:', err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log('Update successful. Rows affected:', this.changes);
        res.json({ success: true });
    });
});

// Skills
app.post('/api/skills', (req, res) => {
    const { name, category, icon } = req.body;
    db.run(`INSERT INTO skills (name, category, icon) VALUES (?, ?, ?)`, [name, category, icon], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.delete('/api/skills/:id', (req, res) => {
    db.run(`DELETE FROM skills WHERE id = ?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Projects
app.post('/api/projects', (req, res) => {
    const { title, description, image_url, link, tech_stack } = req.body;
    db.run(`INSERT INTO projects (title, description, image_url, link, tech_stack) VALUES (?, ?, ?, ?, ?)`, 
        [title, description, image_url, link, tech_stack], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.delete('/api/projects/:id', (req, res) => {
    db.run(`DELETE FROM projects WHERE id = ?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Education
app.post('/api/education', (req, res) => {
    const { degree, institution, year, description } = req.body;
    db.run(`INSERT INTO education (degree, institution, year, description) VALUES (?, ?, ?, ?)`, 
        [degree, institution, year, description], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
});

app.delete('/api/education/:id', (req, res) => {
    db.run(`DELETE FROM education WHERE id = ?`, [req.params.id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

export default app;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
