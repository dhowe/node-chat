let net = require('net');
let readline = require('readline');

// create a connection to the server
let host = '192.168.0.162', port = 8080;
let socket = net.createConnection({ host, port }, listen); 

// display any incoming messages from the server
socket.on('data', (data) => {
  console.log(`${data.toString('utf-8')}`);
  waitForInput();
});

// handle the server closing the connection
socket.on('close', exit);

// a listener for user keyboard input
let name, rl = readline.createInterface(process.stdin, process.stdout);

// connect and prompt  the user for a name
async function listen() {
  console.log('Connected to the chat, your name?');
  name = await new Promise((resolve) => {
    rl.question('', (answer) => {
      console.log(`Welcome ${answer}, type at the > prompt, use /bye to exit`);
      resolve(answer);
    });
  });
  waitForInput();
}

// recursively wait for the user to type a message
function waitForInput() {
  rl.question('> ', function (answer) {
    if (answer == '/bye') exit();
    socket.write(name + ': ' + answer);
    waitForInput(); // recurse
  });
};

function exit() {
  socket.end();
  rl.close();
  process.exit(0);
} 
