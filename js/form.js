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
    if(errUser ==null)
    {
        console.log(1);
    }else if (errUser != null){
        console.log("El usuario ya esta en uso");
        checkErr = 0;
        $("#errMessage").html("El usuario ya está en uso");
        $("#errMessage").show();

        $("#u").css("border-color", "red");

    }
    if(errMail == null)
    {
        console.log(2);
    } else if (errMail != null){
        console.log("El mail ya esta en uso");
        checkErr = 0;
        $("#errMessage").html("El mail ya está en uso");
        $("#errMessage").show();

        $("#m").css("border-color","#FF0000");

    }
    if(errData == null)
    {
        console.log(3);
    } else if(errData != null){
        console.log("Faltan datos");
        checkErr = 0;
        $("#errMessage").html("Por favor, complete todos los campos");
        $("#errMessage").show();

    }
    if(errIncor == null)
    {
        console.log(4);
    } else if(errIncor != null){
        console.log("Usuario y/o contraseña incorrectas");
        checkErr = 0;
        $("#errMessage").html("El usuario y/o la contraseña son incorrectas");
        $("#errMessage").show();

    }

    

        // if($("#u").val()=="" && $("#p").val()==""){
        //     $("#divt").html("Debe ingresar Usuario y Contraseña");
        //     $("#divt").show();
        //     $("#1").css("color","#FF0000");
        //     $("#2").css("color","#FF0000");
        // }else if($("#u").val()!='' && $("#p").val()==''){
        //     $("#divt").html("Debe ingresar Contraseña");
        //     $("#divt").show();
        //     $("#2").css("color","#FF0000");
        // }else if($("#u").val()=='' && $("#p").val()!=''){
        //     $("#divt").html("Debe ingresar Usuario");
        //     $("#divt").show();
        //     $("#1").css("color","#FF0000");
        // }

    // $("#u").focus(function(){
    //     $("#divt").hide();
    //     $("#divt").html("");
    //     $("#1").css("color","#000000");
    // });
    // $("#p").focus(function(){
    //     $("#divt").hide();
    //     $("#divt").html("");
    //     $("#2").css("color","#000000");
    // });
};

window.setInterval(function() {
    if (checkErr == 1) {
        findErr();  
    }
  }, 1000);

// $(document).ready(function(){
//     if(errUser ==null)
//     {
//         console.log(1);
//     }else if (errUser != null){
//         console.log("El usuario ya esta en uso");
//     }
//     if(errMail == null)
//     {
//         console.log(2);
//     } else if (errMail != null){
//         console.log("El mail ya esta en uso");
//     }
//     if(errData == null)
//     {
//         console.log(3);
//     } else if(errData != null){
//         console.log("Faltan datos");
//     }
// });