const WebSocket = require('ws');
const os = require('os');
const net = require('net');

// Function to get the local IP address
function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const address of addresses) {
            if (address.family === 'IPv4' && !address.internal) {
                return address.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost
}

// Function to validate the given IP address
function isValidIP(ip) {
    return net.isIP(ip) !== 0; // returns 0 if invalid
}

// Get the command-line argument for IP address
const customIP = process.argv[2]; // Get the 3rd argument (index 2)
let localIP = isValidIP(customIP) ? customIP : getLocalIP();

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', socket => {
    console.log('New client connected!');
  
    // Listen for messages from clients
    socket.on('message', message => {
      console.log(`Received message: ${message}`);
  
      // Send a response back to all connected clients
      server.clients.forEach(client => {
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

console.log(`WebSocket server running on ws://${localIP}:8080`);
