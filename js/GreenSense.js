function showmenu() {
    document.getElementById("navbar-items-responsive").classList.toggle("show");
}

$(document).ready(function(){

    //Forms - sign up
     $('#S').click(function(){
        alert("j");
     });

    //FRONT-END
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


// var socket = io('http://localhost:9000');

// socket.on('basura', (data) =>{
//     alert(data);
//     console.log(data);
// })


// io.on('connection'), socket => {
//     console.log('User')
//     socket.emit('message', "Hello")
//     socket.on('send-chat-message', message => {
//       console.log(message)
//     })
// }
