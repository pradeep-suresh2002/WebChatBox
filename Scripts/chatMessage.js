// Importing neccessary libraries 
import { userChatPage,userLoginPage,socket } from "./userLogin.js";
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
let roomIdValue = document.getElementsByClassName("room-id")[0];

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
    socket.emit("user-left",displayUserName.value);
    // location.reload();
    userLoginPage.style.display="block";
    userChatPage.style.display="none";
    

    
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
    console.log(message);
    let receiveMessage =    `<div class="receive-message">
    <div class="receive-message--value">
    <div class="current-user-name"> <span>${Name}</span></div>${message}</div></div>`
    // Write the content to the HTML page
    document.getElementsByClassName("user-messages")[0].innerHTML+= receiveMessage;
    messageBody.scrollTop = messageBody.scrollHeight;
});

socket.on("receive-status",(string,message) =>{
    if (string == displayUserName.value){
        let writeStatus = `                    <div class="user-join">
        <div class="user-status">You ${message} the chat</div> </div>`;
        document.getElementsByClassName("user-messages")[0].innerHTML+= writeStatus;
    }
    else{
        let writeStatus = `                    <div class="user-join">
        <div class="user-status">${string} ${message} the chat</div> </div>`;
        document.getElementsByClassName("user-messages")[0].innerHTML+= writeStatus;
    }
    messageBody.scrollTop = messageBody.scrollHeight;

});
onlineusersButton.addEventListener("click",function(){
    console.log("Clicked");

})


socket.on("online-users", (name) => {

    document.getElementsByClassName("display-online-users")[0].replaceChildren();
    name.forEach((element) => {
    let onlineStatus = `<ul>
    <li>${element}</li>
        </ul>`;
    document.getElementsByClassName("display-online-users")[0].innerHTML += onlineStatus;
    });
});
