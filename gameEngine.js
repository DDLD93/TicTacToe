// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

app.use(express.static(__dirname + '/public'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});
// listening for players moves
io.on('connection', function(client) {
    console.log(client.id);
    client.on('player1', (e) => io.emit('player1Res', e ))
    client.on('playerO', (e) => io.emit('playerORes', e ))
   
});

server.listen(4200);