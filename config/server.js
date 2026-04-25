const http = require('http');

const PORT = 3000;

const HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Node.js API - Super XAMPP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <h1>Node.js API</h1>
</body>
</html>`;

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

http.createServer((req, res) => {
    const u = req.url.split('?')[0];
    if (u === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(HTML);
    } else if (u === '/api/status') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ status: 'online', uptime: Math.floor(process.uptime()), version: '1.0.0' }));
    } else if (u === '/api/time') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ timestamp: new Date().toISOString(), unix: Date.now() }));
    } else if (u === '/api/random') {
        res.writeHead(200, HEADERS);
        res.end(JSON.stringify({ number: Math.floor(Math.random() * 1000) }));
    } else {
        res.writeHead(404, HEADERS);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}).listen(PORT, () => console.log('Server on ' + PORT));
