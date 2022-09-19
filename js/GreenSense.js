$(document).ready(function(){

    //FRONT-END

    $("#fR").click(function(){
        $("body").css("background-color","#FF0000");
    });

    $("#fA").click(function(){
        $("body").css("background-color","#FFFF00");
    });

    $("#fV").click(function(){
        $("body").css("background-color","#008000");
    });


    $("#hide-g").click(function(){
        if ($("#show-g").is(":visible")){
        $("#show-g").hide();
        }else if($("#show-g").is(":hidden")){
            $("#show-g").show();
        }
    });
});

var num = 1;

const io = require('socket.io')(3000)

io.on('connection'), socket => {
    console.log('User')
    socket.emit('message', "Hello")
    socket.on('send-chat-message', message => {
      console.log(message)
    })
}