var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3001, function () {
    console.log('listening on *:3001');
});

app.use(express.static(__dirname + '/client/build'));

io.on('connection', function (socket) {
    console.log('[!] user connected');

    socket.on('message', function (msg) {
        console.log('-> new message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', function () {
        console.log('[!] user disconnected');
    });
});
