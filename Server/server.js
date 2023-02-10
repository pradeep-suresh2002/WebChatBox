// Import required libraries
var express = require('express');
var socket = require('socket.io');

// Declare the app
var app = express();
// Declare the host port number
var server = app.listen(4000,function(){
    console.log("Started the server");
});
// Link all the assets with index.html
app.use(express.static(process.cwd()));
// Declare the array to show online users
let onlineUsersArray =[];
// Initiate the socket
var io =socket(server);
io.on('connection',(socket)=>{
    // Join for private room
    socket.on("join-room",(room) =>{
        socket.join(room);
    });
    // Get the status of user 
    socket.on("status-user",(string,room) =>{
        // For public chat
        if (room == ""){
            io.emit("receive-status",string,"joined");
            onlineUsersArray.push(string);
            io.emit("online-users",onlineUsersArray);
            console.log(onlineUsersArray);
            // Emit the message on disconnect event
            socket.on("disconnect",()=>{
                socket.broadcast.emit("receive-status",string,"disconnected"); 
                onlineUsersArray = onlineUsersArray.filter(item => item !== string);
                io.emit("online-users",onlineUsersArray);
            });
            // Emit message on user left event
            socket.on("user-left",string =>{
                socket.broadcast.emit("receive-status",string,"left");
                onlineUsersArray = onlineUsersArray.filter(item => item !== string);
                io.emit("online-users",onlineUsersArray);
        
            });
            // Emit the message to other memebers on the send message event
            socket.on("send-message",(message,string)=>{
                console.log(message);
                socket.broadcast.emit("receive-message",message,string);
            });
            
        }
        // For private rooms
        else{
            io.emit("receive-status",string,"joined");
            onlineUsersArray.push(string);
            io.emit("online-users",onlineUsersArray);
            console.log(onlineUsersArray);
            // Emit the message on disconnect event
            socket.on("disconnect",()=>{
                socket.broadcast.emit("receive-status",string,"disconnected"); 
                onlineUsersArray = onlineUsersArray.filter(item => item !== string);
                io.emit("online-users",onlineUsersArray);
                // console.log(onlineUsersArray);
            });
            // Emit message on user left event
            socket.on("user-left",string =>{
                socket.broadcast.emit("receive-status",string,"left");
                onlineUsersArray = onlineUsersArray.filter(item => item !== string);
                io.emit("online-users",onlineUsersArray);
        
            });
             // Emit the message to other memebers on the send message event
            socket.on("send-message",(message,string)=>{
                console.log(message);
                socket.broadcast.to(room).emit("receive-message",message,string);
            });
        }

        
    });


});



