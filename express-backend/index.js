//Include modules.
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require("path");
const animals = require("animals");

//App setup
const app = express();

//Static files
app.use(express.static(path.join(__dirname, "..", "build")));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

// our server instance
const server = http.createServer(app)

const port = 4001;

server.listen(port, () => console.log(`Listening on port ${port}`));

//Socket setup
var io = socket(server);

//Callback function below fires when server makes a socket connection with a client
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);

    socket.on('createGroup', function(room){
        socket.join(room);
        socket.emit('hasCreatedGroup', 'hasCreatedGroup');
	});

    socket.on('joinGroup', function(room){
        socket.join(room);
        socket.emit('joinCompleted', 'joinCompleted');
    });

    socket.on('getWords', function(){
        let words = [];
        for (let i = 0; i < 5; i ++) {
            words.push(animals());
        }
        socket.emit('hasGottenWords', words);
	});

    socket.on('picture', function(code){
        io.in(code).emit('picture', 'picture');
    });

    socket.on('play', function(code){
        let clients = io.nsps["/"].adapter.rooms[code];
        io.in(code).emit('play', Object.keys(clients).length);
    });

    socket.on('vote', function(code){
        io.in(code).emit('vote', 'vote');
    });

    socket.on('nextRound', function(code){
        io.in(code).emit('nextRound', 'nextRound');
    });

    socket.on('finalScore', function(code){
        io.in(code).emit('finalScore', 'finalScore');
    });
});