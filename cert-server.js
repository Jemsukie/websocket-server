const WebSocket = require('ws');
const https = require('https'); // Import the https module
const fs = require('fs'); // Import the fs module to read the certificate files
// const os = require('os');
// const net = require('net');

// Read SSL certificate files (replace with your actual file paths)
const server = https.createServer({
    cert: fs.readFileSync('cert/server.cert'),  // For self-signed cert: server.cert or localhost.pem
    key: fs.readFileSync('cert/server.key')     // For self-signed cert: server.key or localhost-key.pem
  });
  
  // Create WebSocket server using the secure https server
  const wss = new WebSocket.Server({ server, port: 8080 });
  
  // Handle WebSocket connections
  wss.on('connection', socket => {
    console.log('New client connected!');
  
    // Listen for messages from clients
    socket.on('message', message => {
      console.log(`Received message: ${message}`);
  
      // Send a response back to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`Server received: ${message}`);
        }
      });
    });
  
    // Handle connection close
    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });
