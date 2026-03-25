import fs from 'fs';
const content = fs.readFileSync('src/components/Hero.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('fontSize')) {
        console.log(`${i + 1}: ${line.trim()}`);
    }
});
