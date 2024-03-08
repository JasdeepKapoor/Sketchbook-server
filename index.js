const express = require('express');
const { createServer } = require("http");
const {Server} = require('socket.io');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });
app.use(cors({origin:'http://localhost:3000'}))



io.on('connection', (socket) => {

    socket.on('beginPath',(arg)=>{
        socket.broadcast.emit('beginPath', {x:arg.x,y:arg.y})
    })
    socket.on('drawLine',(arg)=>{
        socket.broadcast.emit('drawLine', {x:arg.x,y:arg.y})
    })
    socket.on('changeColor',(arg)=>{
        socket.broadcast.emit('changeColor', arg)
    })
    socket.on('changeSize',(arg)=>{
        socket.broadcast.emit('changeSize', arg)
    })
    socket.on('changeMenu',(arg)=>{
        socket.broadcast.emit('changeMenu', arg)
    })
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
