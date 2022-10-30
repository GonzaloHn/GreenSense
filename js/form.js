var errUser;
var errMail;
var errData;

var socket = io('http://localhost:3000');

socket.on('errorusu', (usedUser) =>{
    errUser = usedUser;
})
socket.on('errormail', (usedMail) =>{
    errMail = usedMail;
})
socket.on('errordatos', (missingData) =>{
    errData = missingData;
})

$(document).ready(function(){
$("#S").click(function(){
    if(errUser ==null)
    {
        console.log(1);
    }else{
        console.log("El usuario ya esta en uso");
    }
    if(errMail == null)
    {
        console.log(2);
    } else{
        console.log("El mail ya esta en uso");
    }
    if(errData == null)
    {
        console.log(3);
    } else{
        console.log("Faltan datos");
    }
});
});