$(document).ready(function(){

    const donut_energy = $('#donut-chart-energy');
    const donut_chart_energy = new Chart(donut_energy, {
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
                  'rgb(241, 198, 7)',
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