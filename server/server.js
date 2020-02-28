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

    socket.on('createMessage', (message) => {
        console.log('createdMessage', message)
        io.emit('createMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    })
});

server.listen(port, () => {
    console.log(`Server is start on port:- ${port}`);
})