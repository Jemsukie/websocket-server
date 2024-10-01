const WebSocket = require('ws');
const https = require('https'); // Import the https module
const fs = require('fs'); // Import the fs module to read the certificate files
// const os = require('os');
// const net = require('net');

// Read SSL certificate files (replace with your actual file paths)
const server = https.createServer({
    cert: fs.readFileSync('path/to/server.cert'),  // For self-signed cert: server.cert or localhost.pem
    key: fs.readFileSync('path/to/server.key')     // For self-signed cert: server.key or localhost-key.pem
  });
  
  // Create WebSocket server using the secure https server
  const wss = new WebSocket.Server({ server });
  
  // Handle WebSocket connections
  wss.on('connection', (ws) => {
    console.log('Client connected');
  
    ws.on('message', (message) => {
      console.log('received: %s', message);
      ws.send(`Hello, you sent -> ${message}`);
    });
  
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
  
  // Start the HTTPS server and WebSocket server
  server.listen(8080, () => {
    console.log('WebSocket Secure (wss://) server is running on https://localhost:8080');
  });
