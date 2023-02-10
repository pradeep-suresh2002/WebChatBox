//Declaration of global varaibles for DOM elements
let userName = document.getElementsByClassName("user-name")[0];
let roomId = document.getElementsByClassName("room-id")[0];
let joinButton = document.getElementsByClassName("join-button")[0];
let errorValue = document.getElementById("error-message");
let optionalValue = document.getElementById("optional-message");
// Exporting neccessary variables
export let userLoginPage = document.getElementById("user-login-page");
export let userChatPage = document.getElementById("user-chat-page");
// Export the web socket
export var socket = io.connect("https://titanium-button-moonflower.glitch.me");
//Add event listener to change the focus of input tabs on enter event
userName.addEventListener("keypress",function(event){
        errorValue.innerHTML="";
        if (event.key == "Enter"){
            roomId.focus();
            optionalValue.innerHTML = "Optional";
        }
        
        
});
//Add event listener to change the focus of input tabs on enter event
roomId.addEventListener("keypress",function(event){

    if (event.key=="Enter"){
        joinButton.focus();
        optionalValue.innerHTML = "";
    }
    optionalValue.innerHTML = "";
});
// Display optional message to the user
roomId.addEventListener("focus",(event)=>{
    console.log("True");
    if (roomId.value ==""){
        console.log(roomId.value);
        optionalValue.innerHTML = "Optional";
    }
    else{
        optionalValue.innerHTML = "";
    }
})
//Add event listener to get the value of user name input
userName.addEventListener("change",function(){
    console.log(userName.value);
});
//Add event listener to get the value of room id
roomId.addEventListener("change",function(){
    
    console.log(roomId.value);
});
// Add event listner for user name validation
['focus','change'].forEach( evt => 
    userName.addEventListener(evt,userNameValidation)
    
);


// Add event listener for join button
joinButton.addEventListener("click",function(){
    //Regex for alphabets
    
    var alphabets =/^[A-Za-z]+$/;
    let currentUserName = userName.value;
    let currentUserNameLength = currentUserName.length;
    // Check for empty user name
    if ( currentUserName===""){
        errorValue.innerHTML = "Enter the user name";
    }
    // Check for invalid user name
    else if (currentUserNameLength<3 || !currentUserName.match(alphabets)){
        errorValue.innerHTML = "Enter a valid user name";
        userName.addEventListener("click", function(){
            userName.value="";
        });
    }
    /* Perform for correct user name
    * Hide the login page 
    *Display chat page on correct details */
    else{
        optionalValue.innerHTML = "";
        socket.emit("join-room",roomId.value);
        socket.emit("status-user",userName.value,roomId.value);
        userLoginPage.style.display="none";
        userChatPage.style.display="block";
        console.log("Button pressed successfully");
    }

});
// Function to check whether the user name is valid or not
function userNameValidation(){
    var alphabets =/^[A-Za-z]+$/;
    let currentUserName = userName.value;
    let currentUserNameLength = currentUserName.length;
    let bool = true;
    // Check for empty user name
    if ( currentUserName===""){
        errorValue.innerHTML = "Enter the user name";
        bool = true;
    }
    // Check for invalid user name
    else if ((currentUserNameLength<3 || !currentUserName.match(alphabets)) && currentUserName!="" ){
        errorValue.innerHTML = "Enter a valid user name";
        bool =false;
        if (bool ==false){
            bool = true;
             userName.addEventListener("click", function(){
                userName.value="";
                bool = true;
            }); 
        };
    } 

}

