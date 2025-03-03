let net = require('net');

let clients = [], host = '192.168.0.162', port = 8080;

// Create a server and wait for clients to connect
let server = net.createServer();
server.on('connection', waitForData);
server.listen(8080, host, () => console.log(`Listening at ${host}:${port}`));

function waitForData(socket) {
  console.log('[client-connect]');

  // Listening for messages from this client
  socket.on('data', (data) => {
    console.log(data);
    clients.forEach(client => {
      if (client !== socket) {
        client.write(data); // broadcast to Other clients only
      }
    });
  });

  // Handle any errors
  socket.on('error', (err) => console.log(err));

  if (!clients.includes(socket)) { 
    clients.push(socket); // add client to list of connected clients
  }
}

