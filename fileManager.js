const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const filePath = path.join(__dirname, 'test.txt');

  if (url === '/create') {
    fs.writeFile(filePath, 'This is a test file.', (err) => {
      if (err) {
        res.end('Error creating file');
      } else {
        res.end('File created successfully');
      }
    });

  } else if (url === '/read') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.end('Error reading file or file not found');
      } else {
        res.end('File content: ' + data);
      }
    });
  } else if (url === '/delete') {
    fs.unlink(filePath, (err) => {
      if (err) {
        res.end('Error deleting file or file not found');
      } else {
        res.end('File deleted successfully');
      }
    });

  } else {
    res.end('Welcome to File Manager! Use /create, /read, or /delete');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});