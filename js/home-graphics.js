
$(document).ready(function(){
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
});

var data_energy = [];
var data_air = [];
var data_weight = [];

var t = new Date();
for (var i = 10; i >= 0; i--) {
    var x = new Date(t.getTime() - i * 1000);
    data_energy.push([x, Math.random()]);
    data_air.push([x, Math.random()]);
    data_weight.push([x, Math.random()]);
} // todo esto sirve para agarrar el momento actual y guardarlo en el data de arriba

var line_chart_energy = new Dygraph(document.getElementById("graph-energy"), data_energy, {width:600, height:400, color:"gold"}); //crea el nuevo grafico
var line_chart_air = new Dygraph(document.getElementById("graph-air"), data_air, {width:600, height:400, color:"blue"}); //crea el nuevo grafico
var line_chart_weight = new Dygraph(document.getElementById("graph-weight"), data_weight, {width:600, height:400, color:"red"}); //crea el nuevo grafico

//Variables para jquery
var graphNum = 1;
var dynamicUpdate = 1;
var changeGraphic = 1;
var fadeInNum = 350;

//Codigo funciones jquery
$(document).ready(function(){

    $("#hide-a-g").hide();
    $("#hide-w-g").hide();

    $("#change-g").click(function(){
        if (graphNum == 1){
            //$("#hide-e-g").fadeOut(050);
            $("#hide-e-g").hide();
            $("#hide-a-g").fadeIn(fadeInNum);
            //$("#hide-a-g").show()
            graphNum++;
        }
        else if (graphNum == 2){
            $("#hide-a-g").hide();
            $("#hide-w-g").fadeIn(fadeInNum);
            graphNum++;
        }
        else if (graphNum == 3){
            $("#hide-w-g").hide();
            $("#hide-e-g").fadeIn(fadeInNum);
            graphNum = 1;
        }
    });

    $("#back-g").click(function(){
        if (graphNum == 1){
            //$("#hide-e-g").fadeOut(050);
            $("#hide-e-g").hide();
            $("#hide-w-g").fadeIn(fadeInNum);
            //$("#hide-a-g").show()
            graphNum = 3;
        }
        else if (graphNum == 2){
            $("#hide-a-g").hide();
            $("#hide-e-g").fadeIn(fadeInNum);
            graphNum = 1;
        }
        else if (graphNum == 3){
            $("#hide-w-g").hide();
            $("#hide-a-g").fadeIn(fadeInNum);
            graphNum = 2;
        }
    });

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
});

//Cambiar el gráfico cada tanto
window.setInterval(function() {
if(changeGraphic == 1){
    if (graphNum == 1){
        $("#hide-e-g").hide();
        $("#hide-a-g").fadeIn(fadeInNum);
        graphNum++;
    }
    else if (graphNum == 2){
        $("#hide-a-g").hide();
        $("#hide-w-g").fadeIn(fadeInNum);
        graphNum++;
    }
    else if (graphNum == 3){
        $("#hide-w-g").hide();
        $("#hide-e-g").fadeIn(fadeInNum);
        graphNum = 1;
    }
}
}, 10000);

window.setInterval(function() {
if(dynamicUpdate == 1){
    var x = new Date(); 
    var y = Math.random(); //agarra un valor random para Y
   
    data_energy.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    data_energy.push([x, y]); //añade un nuevo elemtno al final de un array
    
    data_air.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    data_air.push([x, y]); //añade un nuevo elemtno al final de un array
    
    data_weight.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
    data_weight.push([x, y]); //añade un nuevo elemtno al final de un array
    
    line_chart_energy.updateOptions( { 'file': data_energy } ); //actualiza el grafico con nuevos valores, los de data
    line_chart_air.updateOptions( { 'file': data_air } ); //actualiza el grafico con nuevos valores, los de data
    line_chart_weight.updateOptions( { 'file': data_weight } ); //actualiza el grafico con nuevos valores, los de data
    
}
}, 1000);


// window.setInterval(function() {
//     graphNum++;
// }, 10000);
