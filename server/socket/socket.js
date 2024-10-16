import {Server} from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
        methods:['GET','POST']
    }
})

const userSocketMap = {} ; // this map stores socket id corresponding the user id; userId -> socketId
// create a users map to keep track of users
const users = new Map();

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    socket.on('join room', (room) => {
        socket.join(room);
        socket.to(room).emit('user connected');
    });

    socket.on('ice-candidate', (candidate) => {
        socket.to('room1').emit('ice-candidate', candidate); // change 'room1' accordingly
    });

    socket.on('offer', (offer) => {
        socket.to('room1').emit('offer', offer); // change 'room1' accordingly
    });

    socket.on('answer', (answer) => {
        socket.to('room1').emit('answer', answer); // change 'room1' accordingly
    });


    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        if(userId){
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
})

export {app, server, io};