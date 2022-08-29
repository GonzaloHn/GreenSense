$(document).ready(function(){

    //FRONT-END
    //Solo un gráfico a la vez

    //$("#chart-energy").show();
    //$("#chart-air").hide();
    //$("#chart-trash").hide();


    $("#fR").click(function(){
        $("body").css("background-color","#FF0000");
    });

    $("#fA").click(function(){
        $("body").css("background-color","#FFFF00");
    });

    $("#fV").click(function(){
        $("body").css("background-color","#008000");
    });


    //Probando chart.js "En progreso"
    const ctx = $('#myChart');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                  display: false
                }
            }
        }
    });

    $("#hide-g").click(function(){
        if ($("#show-g").is(":visible")){
        $("#show-g").hide();
        }else if($("#show-g").is(":hidden")){
            $("#show-g").show();
        }
    });
    const cx = $('#myCHart');
    const myChart2 = new Chart(cx, {
        type: 'doughnut',
        data: {
            labels: [
                'Green',
                'Blue',
              ],
              datasets: [{
                label: 'My First Dataset',
                data: [200, 150],
                backgroundColor: [
                  'rgb(138,221,45)',
                  'rgb(0, 0, 0, 0)',
                ],
                hoverOffset: 4,
                borderWidth: 1
            }]
        },
        options: {
            events: ["", "mouseout", "", "touchstart", "touchmove", "touchend"],
            cutout:170,
            plugins: {
                legend: {
                  display: false
                }
            },
        },
        centerText: {
            display: true,
            text: "280"
        }
    });
});