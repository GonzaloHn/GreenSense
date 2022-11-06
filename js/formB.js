
var errData;
var errIncor;

var checkErr = 1;

var errores = [0];

var socket = io('http://localhost:9000');


socket.on('errordatos', (missingData) =>{
    errData = missingData;
    if(errData != null){
        errores.push(1);
    }
})
socket.on('errorincor', (userPassIncor) =>{
    errIncor = userPassIncor;
    if(errIncor != null){
        errores.push(2);
    }
})


// $(".login-input-definition-first").css("color","#FF0000");


function findErr(){
    if(errIncor != null && errores[errores.length - 1] == 2){
        console.log("Usuario y/o contraseña incorrectas");
        checkErr = 0;
        
        $("#errMessage").html("El usuario y/o la contraseña son incorrectas");
        $("#errMessage").show();

        $("#u").css("border-color", "red");
        $("#c").css("border-color", "red");

        return;
    }
    if (errData != null && errores[errores.length - 1] == 1){
        console.log("Faltan datos");
        checkErr = 0;

        $("#errMessage").html("Por favor, complete todos los campos");
        $("#errMessage").show();

        if($("#u").val == ""){
            $("#u").css("border-color", "#FF0000");

            $("#c").css("border-color", "black");
        }
        if($("#c").val == ""){
            $("#c").css("border-color", "#FF0000");

            $("#u").css("border-color", "black");
        }
        return;

    } 

};

window.setInterval(function() {
    if (checkErr == 1) {
        findErr();  
    }
}, 1000);
