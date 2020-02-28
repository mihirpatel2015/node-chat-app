const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIo(server);;

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected.')

    socket.emit('newMessage', {
        from: 'mihirpatel2015@gmail.com',
        text: 'Hey, what is going on.',
        creatAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('createdMessage', message)
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
});

server.listen(port, () => {
    console.log(`Server is start on port:- ${port}`);
})