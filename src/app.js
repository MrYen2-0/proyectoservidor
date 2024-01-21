const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('message', (data) => {
        console.log('Mensaje recibido:', data);
        socket.emit('message', 'Mensaje recibido');
    });

    app.get('/poll', (req, res) => {
        const data = 'Datos de la encuesta';
        res.send(data);
    });

    app.get('/long-poll', (req, res) => {
        setTimeout(() => {
            const data = 'Datos de la encuesta larga';
            res.send(data);
        }, 10000); 
    });

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

server.listen(3000, () => {
    console.log('El servidor está escuchando en el puerto 3000');
});
