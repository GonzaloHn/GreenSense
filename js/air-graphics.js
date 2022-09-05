$(document).ready(function(){

    const donut_air = $('#donut-air-energy');
    const donut_chart_air = new Chart(donut_air, {
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
                  'rgb(51, 255, 215)',
                  'rgb(0, 0, 0, 0)',
                ],
                hoverOffset: 4,
                borderWidth: 1
            }]
        },
        options: {
            events: ["", "mouseout", "", "", "touchmove", "touchend"],
            cutout:'90%',
            responsive: true,
            maintainAspectRatio: true, 
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