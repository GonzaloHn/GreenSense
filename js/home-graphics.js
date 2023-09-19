
// $(document).ready(function(){
// const line_energy = $('#line-chart-energy');
// const line_chart_energy = new Chart(line_energy, {
//     type: 'line',
//     data: {
//         labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [65, 59, 80, 81, 56, 55, 40, 70],
//             fill: false,
//             borderColor: 'rgb(241, 198, 7)',
//             tension: 0.1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//     },
// });

// const line_air = $('#line-chart-air');
// const line_chart_air = new Chart(line_air, {
//     type: 'line',
//     data: {
//         labels: ["aa", "bb", "cc", "dd", "ee", "ff", "gg"],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [70, 13, 1, 1, 1, 100, 30],
//             fill: false,
//             borderColor: 'rgb(51, 255, 215)',
//             tension: 0.1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//     },
// });

// const line_weight = $('#line-chart-weight');
// const line_chart_weight = new Chart(line_weight, {
//     type: 'line',
//     data: {
//         labels: ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg"],
//         datasets: [{
//             label: 'My First Dataset',
//             data: [30, 50, 89, 69, 10, 0, 40],
//             fill: false,
//             borderColor: 'rgb(241, 7, 7)',
//             tension: 0.1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         },
//         plugins: {
//             legend: {
//                 display: false
//             }
//         },
//     },
// });
// });

var data_s_energy;
var data_s_air;
var data_s_weight;

var data_o_energy;
var data_o_air;
var data_o_weight;
//Sockets
var socket = io('http://localhost:4000');

socket.on('energia', (socketEnergy) =>{
    console.log("Socket enegía: " + socketEnergy);
    data_s_energy = socketEnergy;
})
 socket.on('aire', (socketAir) =>{
     console.log("Socket calidad aire: " + socketAir);
     data_s_air = socketAir;
})
socket.on('basura', (socketWeight) =>{
    console.log("Socket basura: " + socketWeight);
    data_s_weight = socketWeight;
})

//Sockets - valores óptimos
socket.on('optimoenergia', (socketOptEnergy) =>{
    console.log("El valor óptimo de energía es: " + socketOptEnergy);
    data_o_energy = socketOptEnergy;
})
 socket.on('optimoaire', (socketOptAir) =>{
     console.log("El valor óptimo de calidad de aire es: " + socketOptAir);
     data_o_air = socketOptAir;
})
socket.on('optimobasura', (socketOptWeight) =>{
    console.log("El valor óptimo de basura es: " + socketOptWeight);
    data_o_weight = socketOptWeight;
})

// Setear DyGraph
var data_energy = [];
var data_air = [];
var data_weight = [];

var t = new Date();
for (var i = 10; i >= 0; i--) {
    var x = new Date(t.getTime() - i * 1000);
    data_energy.push([x, 1, 2]);
    data_air.push([x, 1, 2]);
    data_weight.push([x, 1, 2]);
} 

var line_chart_energy = new Dygraph(document.getElementById("graph-energy"), data_energy, {width:600, height:400, colors:["gold", "black"],strokeBorderWidth: 1,strokeBorderColor:'', }); //crea el nuevo grafico
var line_chart_air = new Dygraph(document.getElementById("graph-air"), data_air, {width:600, height:400, colors:["blue", "black"], strokeBorderWidth: 1,strokeBorderColor:''}); //crea el nuevo grafico
var line_chart_weight = new Dygraph(document.getElementById("graph-weight"), data_weight, {width:600, height:400, colors:["red", "black"], strokeBorderWidth: 1,strokeBorderColor:''}); //crea el nuevo grafico

//Variables para jquery
var graphNum = 1;
var dynamicUpdate = 1;
var changeGraphic = 1;
var fadeInNum = 350;
var showOpt = 1;
var deleteVal = 1;

//Codigo funciones jquery
$(document).ready(function(){
    
    $(".config-tab-wrap").hide();


    //Funcion de las configuraciones
    $("#config-g").click(function(){
        $(".config-tab-wrap").show();
    });
    $(".config-tab-close").click(function(){
        $(".config-tab-wrap").hide();
    });

    $("#config-showOpt").click(function(){
        if( $("#config-showOpt").is(':checked') ){
            showOpt = 1;
        } else {
            showOpt = 0;
        }
    });
    $("#config-deleteVal").click(function(){
        if( $("#config-deleteVal").is(':checked') ){
            deleteVal = 1;
        } else {
            deleteVal = 0;
        }
    });

    //Cambiar los ValNow
    setInterval(swapValNow,1000);
    function swapValNow(){
        if(data_s_energy != null){
            $("#ValNow_energy").html("Valor actual: " + data_s_energy);
            $("#ValNow_air").html("Valor actual: " + data_s_air);
            $("#ValNow_weight").html("Valor actual: " + data_s_weight);
        }
    }

    //Esconder gráficos
    $("#hide-a-g").hide();
    $("#hide-w-g").hide();

    //Cambiar gráficos
    $("#change-g").click(function(){
        if (graphNum == 1){
            //$("#hide-e-g").fadeOut(050);
            $("#hide-e-g").hide();
            $("#hide-a-g").fadeIn(fadeInNum);

            $("#energy-title").hide();
            $("#air-title").fadeIn(fadeInNum);

            //$("#hide-a-g").show()
            graphNum++;
        }
        else if (graphNum == 2){
            $("#hide-a-g").hide();
            $("#hide-w-g").fadeIn(fadeInNum);

            $("#air-title").hide();
            $("#weight-title").fadeIn(fadeInNum);

            graphNum++;
        }
        else if (graphNum == 3){
            $("#hide-w-g").hide();
            $("#hide-e-g").fadeIn(fadeInNum);

            $("#weight-title").hide();
            $("#energy-title").fadeIn(fadeInNum);
            
            graphNum = 1;
        }
    });

    $("#back-g").click(function(){
        if (graphNum == 1){
            //$("#hide-e-g").fadeOut(050);
            $("#hide-e-g").hide();
            $("#hide-w-g").fadeIn(fadeInNum);

            $("#energy-title").hide();
            $("#weight-title").fadeIn(fadeInNum);

            //$("#hide-a-g").show()
            graphNum = 3;
        }
        else if (graphNum == 2){
            $("#hide-a-g").hide();
            $("#hide-e-g").fadeIn(fadeInNum);

            $("#air-title").hide();
            $("#energy-title").fadeIn(fadeInNum);

            graphNum = 1;
        }
        else if (graphNum == 3){
            $("#hide-w-g").hide();
            $("#hide-a-g").fadeIn(fadeInNum);

            $("#weight-title").hide();
            $("#air-title").fadeIn(fadeInNum);

            graphNum = 2;
        }
    });

    //Pausar gráficos
    $("#play-g").hide();
    $("#pause-g").click(function(){

        dynamicUpdate = 0;
        changeGraphic = 0;

        $("#pause-g").hide();
        $("#play-g").show();
        
    });
    $("#play-g").click(function(){

        dynamicUpdate = 1;
        changeGraphic = 1;

        $("#play-g").hide();
        $("#pause-g").show();

    })

    $(".carga-tab-wrap").hide();

});

//Cambiar el gráfico cada tanto
window.setInterval(function() {
if(changeGraphic == 1){
    if (graphNum == 1){
        $("#hide-e-g").hide();
        $("#hide-a-g").fadeIn(fadeInNum);

        $("#energy-title").hide();
        $("#air-title").fadeIn(fadeInNum);

        graphNum++;
    }
    else if (graphNum == 2){
        $("#hide-a-g").hide();
        $("#hide-w-g").fadeIn(fadeInNum);

        $("#air-title").hide();
        $("#weight-title").fadeIn(fadeInNum);

        graphNum++;
    }
    else if (graphNum == 3){
        $("#hide-w-g").hide();
        $("#hide-e-g").fadeIn(fadeInNum);

        $("#weight-title").hide();
        $("#energy-title").fadeIn(fadeInNum);

        graphNum = 1;
    }
}
}, 900000);


window.setInterval(function() {
if(dynamicUpdate == 1){
    var x = new Date(); 
    //var y = Math.random(); //agarra un valor random para Y
    //console.log("Prueba " + data_s_air);

     var y_energy = data_s_energy; //y de los sockets, prueba
     var y_air = data_s_air; //y de los sockets, prueba

     if(data_s_weight < 0){
        data_s_weight = data_s_weight * (-1);
      }

     var y_weight = data_s_weight; //y de los sockets, prueba

     var y_opt_energy = data_o_energy; //y de los sockets optimo, prueba
     var y_opt_air = data_o_air; //y de los sockets optimo, prueba
     var y_opt_weight = data_o_weight; //y de los sockets optimo, prueba

    //data_energy.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    //data_energy.push([x, y, y + 1]); //añade un nuevo elemtno al final de un array
    //data_energy.push([x, y_energy, y_opt_energy]); //añade un nuevo elemtno al final de un array
    
    //data_air.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    //data_air.push([x, y, y + 1]); //añade un nuevo elemtno al final de un array
    //data_air.push([x, y_air, y_opt_air]); //añade un nuevo elemtno al final de un array

    //data_weight.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    //data_weight.push([x, y, y + 1]); //añade un nuevo elemtno al final de un array
    //data_weight.push([x, y_weight, y_opt_weight]); //añade un nuevo elemtno al final de un array

    if(showOpt == 1){
        data_energy.push([x, y_energy, y_opt_energy]);
        data_air.push([x, y_air, y_opt_air]);
        data_weight.push([x, y_weight, y_opt_weight]);
    } else{
        data_energy.push([x, y_energy, null]);
        data_air.push([x, y_air, null]);
        data_weight.push([x, y_weight, null]);
    }

    if(deleteVal == 1){
        data_energy.shift();
        data_air.shift();
        data_weight.shift();
    }

    line_chart_energy.updateOptions( { 'file': data_energy } ); //actualiza el grafico con nuevos valores, los de data
    line_chart_air.updateOptions( { 'file': data_air } ); //actualiza el grafico con nuevos valores, los de data
    line_chart_weight.updateOptions( { 'file': data_weight } ); //actualiza el grafico con nuevos valores, los de data
    
}
}, 1000);


// window.setInterval(function() {
//     graphNum++;
// }, 10000);
