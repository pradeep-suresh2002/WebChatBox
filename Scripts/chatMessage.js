// Importing neccessary libraries 
import { userChatPage,userLoginPage } from "./userLogin.js";
// Global declaration of variables
let onlineUsers = document.getElementsByClassName("online-users")[0];
let onlineusersButton = document.getElementById("online-users--button");
let displayOnlineUsers = document.getElementsByClassName("display-online-users")[0];
let messageBody = document.getElementsByClassName("user-messages")[0];
let exitPage = document.getElementById("exit-button");
let errorValue = document.getElementById("error-message");
let sendMessageValue = document.getElementById("send-message--body");
let sendMessage = document.getElementById("send-icon");
let displayUserName = document.getElementsByClassName("user-name")[0];

var socket = io.connect("https://titanium-button-moonflower.glitch.me");
// Event listener for show online users button
onlineUsers.addEventListener("click",function(){
    // Change the content on click event
    if (onlineusersButton.value =="Show online users"){
        displayOnlineUsers.style.display="block";
        messageBody.style.opacity="0.1";
        onlineusersButton.value="Close";
    }
    else if (onlineusersButton.value =="Close"){
        displayOnlineUsers.style.display="none";
        messageBody.style.opacity="1";
        onlineusersButton.value="Show online users";
    }
});

// Event listener for exit button to exit the chat page
exitPage.addEventListener("click",function(){
    userLoginPage.style.display="block";
    userChatPage.style.display="none";
    socket.emit("user-left",displayUserName.value);
});
// Send message to the message body on click of send icon
sendMessage.addEventListener("click",function(){
    let userMessage = sendMessageValue.value
    console.log(sendMessageValue.value);
    sendMessageValue.value = "";
    let writeMessage =    `<div class="user-send-message">
    <div class="send-message--value">
    <div class="current-user-name"> <span>You</span></div>${userMessage}</div></div>`
    // Write the content to the HTML page
    document.getElementsByClassName("user-messages")[0].innerHTML+= writeMessage;
    socket.emit("send-message",(userMessage,displayUserName.value));
      // Add the scroll for the user send messages
    messageBody.scrollTop = messageBody.scrollHeight;

});
// Send messages to the message body on enter event
sendMessageValue.addEventListener("keypress",function(event){
    if (event.key=="Enter"){
        let userMessage = sendMessageValue.value
        console.log(sendMessageValue.value);
        sendMessageValue.value = "";
        let writeMessage =    `<div class="user-send-message">
        <div class="send-message--value">
        <div class="current-user-name"> <span>You</span></div>${userMessage}</div></div>`
        // Write the content to the HTML page
        document.getElementsByClassName("user-messages")[0].innerHTML+= writeMessage;
        
        socket.emit("send-message",userMessage,displayUserName.value);
        // Add the scroll for the user send messages
        messageBody.scrollTop = messageBody.scrollHeight;
    }

});  


socket.on("receive-message",(message,Name) =>{
    let receiveMessage =    `<div class="receive-message">
    <div class="receive-message--value">
    <div class="current-user-name"> <span>${Name}</span></div>${message}</div></div>`
    // Write the content to the HTML page
    document.getElementsByClassName("user-messages")[0].innerHTML+= receiveMessage;
    messageBody.scrollTop = messageBody.scrollHeight;
});

socket.on("receive-status",(string,message) =>{

    let writeStatus = `                    <div class="user-join">
    <div class="user-status">${string} ${message} the chat</div> </div>`;
    document.getElementsByClassName("user-messages")[0].innerHTML+= writeStatus;
});


