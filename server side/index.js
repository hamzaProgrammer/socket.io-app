const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {
    addUsers,
    removeUser,
    getUser,
    getUsersInRoom
}  =  require('./users')

const router = require('./Routes');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {

    socket.on('join', ({name ,room} , callback) => { // we basically use callback for error handling
        const {user , error} = addUsers({id : socket.id , name , room})

        // if error found
        if(error){
            return callback(error);
        }

        socket.emit('message', {user : 'admin' , text : `${user.name}, welcome to the ${user.room}`}) // these are admin genaretd messages
        socket.broadcast.to(user.room).emit('message', {user : 'admin' , text : `${user.name} has joined`}); // broadcast lets everyone know who has joined in group

        socket.join(user.room); // built in function which joins user in room
        // getting all users in room
        io.to(user.name).emit('roomData' , {room: user.room , users: getUsersInRoom(user.room) })

        callback();
    })

    socket.on('sendMessage', (message , callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message' , {user: user.name , text: message})
        io.to(user.name).emit('roomData' , {room: user.room , users: getUsersInRoom(user.room) })

        callback();
    })


    socket.on('disconnection', () => { // calls when user leaves chat
        console.log("User Left !!!")
        console.log("----------------------")
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message' , {user : 'admin' , text : `${user.name} has left chat`})
        }
    })
});

server.listen(process.env.PORT || 5000, () => console.log(`Express Server has started.`));