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
<body class="bg-light">
    <div class="container py-5">
        <h1><i class="bi bi-code-square"></i> Node.js API</h1>
        <p class="lead">Super XAMPP - API de demonstração</p>
        
        <div class="card mt-4">
            <div class="card-header">Endpoints Disponíveis</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><code>GET /</code> - Esta página</li>
                <li class="list-group-item"><code>GET /api/status</code> - Status da API</li>
                <li class="list-group-item"><code>GET /api/time</code> - Hora atual</li>
                <li class="list-group-item"><code>GET /api/random</code> - Número aleatório</li>
            </ul>
        </div>
        
        <div class="card mt-4">
            <div class="card-header">Testes</div>
            <div class="card-body">
                <button class="btn btn-primary me-2" onclick="testStatus()">Test /api/status</button>
                <button class="btn btn-primary me-2" onclick="testTime()">Test /api/time</button>
                <button class="btn btn-primary" onclick="testRandom()">Test /api/random</button>
                <pre id="output" class="mt-3 p-3 bg-dark text-light rounded"></pre>
            </div>
        </div>
    </div>
    
    <script>
    async function testEndpoint(path) {
        const res = await fetch(path);
        const data = await res.json();
        document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    function testStatus() { testEndpoint('/api/status'); }
    function testTime() { testEndpoint('/api/time'); }
    function testRandom() { testEndpoint('/api/random'); }
    </script>
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