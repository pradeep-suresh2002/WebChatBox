var express = require('express');
var socket = require('socket.io');


var app = express();
var server = app.listen(4000,function(){
    console.log("Started the server");
});

app.use(express.static('public'));

var io =socket(server);
io.on('connection',(socket)=>{
    socket.on("status-user",function(string){
        socket.broadcast.emit("receive-status",string,"joined");
        socket.on("disconnect",()=>{
            socket.broadcast.emit("receive-status",string,"disconnected"); 
        });
    });
    socket.on("user-left",string =>{
        socket.broadcast.emit("receive-status",string,"left");
    })

    socket.on("send-message",(message,string)=>{
        socket.broadcast.emit("receive-message",message,string);
    });

})

