import http from 'http';

http.get('http://localhost:5000/api/content', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log("BACKEND JSON:", data));
}).on('error', (err) => console.log("ERROR:", err.message));
