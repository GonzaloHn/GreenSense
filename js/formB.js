
var errData;
var errIncor;

var checkErr = 1;

var socket = io('http://localhost:3000');


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
        }
        if($("#c").val == ""){
            $("#c").css("border-color", "red");

            $("#u").css("border-color", "black");
        }
        return;

    } else if(errIncor != null){
        console.log("Usuario y/o contraseña incorrectas");
        checkErr = 0;
+
        $("#errMessage").html("El usuario y/o la contraseña son incorrectas");
        $("#errMessage").show();

        $("#u").css("border-color", "red");
        $("#c").css("border-color", "red");

    }

};

window.setInterval(function() {
    if (checkErr == 1) {
        findErr();  
    }
}, 1000);
