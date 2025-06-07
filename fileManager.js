const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(__dirname, 'test.txt');

  if (url === '/') {

    const htmlPath = path.join(__dirname, 'index.html');
    fs.readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  else if (url === '/create') {
    fs.writeFile(filePath, 'This is a test file.', (err) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(err ? 'Failed to create file.' : 'File created successfully.');
    });
  }

  else if (url === '/read') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(err ? 'File not found.' : `File Content:\n${data}`);
    });
  }

  else if (url === '/delete') {
    fs.unlink(filePath, (err) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(err ? 'File not found or already deleted.' : 'File deleted successfully.');
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
