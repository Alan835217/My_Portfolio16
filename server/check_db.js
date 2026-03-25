import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('e:/Project/pfile/server/database/portfolio.db');

db.serialize(() => {
    db.all("SELECT * FROM about", (err, rows) => {
        console.log("ABOUT ROWS:", rows);
    });
    db.all("SELECT * FROM settings", (err, rows) => {
        console.log("SETTINGS ROWS:", rows);
    });
    db.all("SELECT * FROM skills", (err, rows) => {
        console.log("SKILLS COUNT:", rows.length);
    });
});
