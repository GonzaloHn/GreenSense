var errUser;
var errMail;
var errData;
var errIncor;

var checkErr = 1;

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
socket.on('errorincor', (userPassIncor) =>{
    errIncor = userPassIncor;
})


// $(".login-input-definition-first").css("color","#FF0000");


function findErr(){
    if (errData != null){
        console.log("Faltan datos");
        checkErr = 0;

        $("#errMessage").html("Por favor, complete todos los campos");
        $("#errMessage").show();

        if($("#u").val == ""){
            $("#u").css("border-color", "red");

            $("#c").css("border-color", "black");
            $("#m").css("border-color", "black");
        }
        if($("#c").val == ""){
            $("#c").css("border-color", "red");

            $("#m").css("border-color", "black");
            $("#u").css("border-color", "black");
        }
        if($("#m").val == ""){
            $("#m").css("border-color","red");

            $("#c").css("border-color", "black");
            $("#u").css("border-color", "black");
        }
        return;

    } else if (errMail != null){
        console.log("El mail ya esta en uso");
        checkErr = 0;

        $("#errMessage").html("El mail ya está en uso");
        $("#errMessage").show();

        $("#m").css("border-color","red");

        $("#c").css("border-color", "black");
        $("#u").css("border-color", "black");


        return;

    } else if(errUser != null){
        console.log("El usuario ya esta en uso");
        checkErr = 0;

        $("#errMessage").html("El usuario ya está en uso");
        $("#errMessage").show();

        $("#u").css("border-color", "red");

        $("#c").css("border-color", "black");
        $("#m").css("border-color", "black");
        
        return;

    } else if(errIncor != null){
        console.log("Usuario y/o contraseña incorrectas");
        checkErr = 0;
+
        $("#errMessage").html("El usuario y/o la contraseña son incorrectas");
        $("#errMessage").show();

        $("#u").css("border-color", "red");
        $("#c").css("border-color", "red");

        $("#m").css("border-color", "black");
    }

};

window.setInterval(function() {
    if (checkErr == 1) {
        findErr();  
    }
}, 1000);
