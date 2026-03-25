import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('e:/Project/pfile/server/database/portfolio.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)");
    
    // Check current
    db.all("SELECT * FROM settings", (err, rows) => {
        console.log("CURRENT SETTINGS:", JSON.stringify(rows));
        
        // Ensure all keys exist
        const keys = ['show_about', 'show_skills', 'show_projects', 'show_education'];
        keys.forEach(k => {
            const exists = rows && rows.find(r => r.key === k);
            if (!exists) {
                console.log("MISSING KEY:", k, " - ADDING NOW");
                db.run("INSERT INTO settings (key, value) VALUES (?, ?)", [k, 'true']);
            }
        });
    });
});
