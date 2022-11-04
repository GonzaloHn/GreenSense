$("#errMessage").hide();

var errUser = null;
var errMail = null;
var errData = null;
var errIncor = null;

var checkErr = 1;

var errores = [0];

var socket = io('http://localhost:3000');

// if(errores[errores.length - 1] == 0){
//      $("#errMessage").html("Array");
//      $("#errMessage").show();
//      errores.push(10);
//      console.log(errores[errores.length - 1]);

// }

socket.on('errorusu', (usedUser) =>{
    errUser = usedUser;
    if(errUser != null){
        errores.push(1);
    }

})
socket.on('errormail', (usedMail) =>{
    errMail = usedMail;
    if(errMail != null){
        errores.push(2);
    }
})
socket.on('errordatos', (missingData) =>{
    errData = missingData;
    console.log("reemplzado");
    if(errData != null){
        errores.push(3);
    }
})


// $(".login-input-definition-first").css("color","#FF0000");
if(errData != null){
    console.log("errData no es null")
} else if(errData == null){
    console.log("errData es null")
}

function findErr(){
    if (errMail != null && errores[errores.length - 1] == 2){
        console.log("El mail ya esta en uso");
        checkErr = 0;

        $("#errMessage").html("El mail ya está en uso");
        $("#errMessage").show();

        $("#m").css("border-color","red");

        $("#c").css("border-color", "black");
        $("#u").css("border-color", "black");


        errUser = null;
        errMail = null;
        errData = null;
        errIncor = null;

        return;

    } if(errUser != null && errores[errores.length - 1] == 1){
        console.log("El usuario ya esta en uso");
        checkErr = 0;

        $("#errMessage").html("El usuario ya está en uso");
        $("#errMessage").show();

        $("#u").css("border-color", "red");

        $("#c").css("border-color", "black");
        $("#m").css("border-color", "black");
        
        errUser = null;
        errMail = null;
        errData = null;
        errIncor = null;

        return;

    }
    if (errData != null && errores[errores.length - 1] == 3){
        console.log("Fasltan datos");
        console.log(errData);
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

        errUser = null;
        errMail = null;
        errData = null;
        errIncor = null;
        
        return;

    } 
};

window.setInterval(function() {
    if (checkErr == 1) {
        findErr();  
    }
}, 1000);
