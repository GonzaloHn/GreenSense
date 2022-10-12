function showmenu() {
    document.getElementById("navbar-items-responsive").classList.toggle("show");
}

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

    //Funciones de Home

    // var graphNum = 1;

    // $("#hide-a-g").hide();
    // $("#hide-w-g").hide();

    // $("#change-g").click(function(){
    //     if (graphNum == 1){
    //         $("#hide-e-g").hide();
    //         $("#hide-a-g").show();
    //         graphNum++;
    //     }
    //     else if (graphNum == 2){
    //         $("#hide-a-g").hide();
    //         $("#hide-w-g").show();
    //         graphNum++;
    //     }
    //     else if (graphNum == 3){
    //         $("#hide-w-g").hide();
    //         $("#hide-e-g").show();
    //         graphNum = 1;
    //     }
    // });

    // var dynamicUpdate = 1;

    // $("#pause-g").click(function(){
    //     dynamicUpdate = 0;
    //     $("body").css("background-color","#008000");
    // });

});

// var num = 1;
const socket = io('http://localhost:9000');

socket.on('basura', (data) =>{
    alert(data);
})
// io.on('connection'), socket => {
//     console.log('User')
//     socket.emit('message', "Hello")
//     socket.on('send-chat-message', message => {
//       console.log(message)
//     })
// }