$(document).ready(function(){

    $(window).resize(function() {
        var widthBrowser =$(window).height();
        var heightBrowser =$(window).width();
        console.log("Tamaño de la pantalla del navegador: width="+widthBrowser +" height="+heightBrowser );
    });

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
                borderColor: [
                    'rgb(241, 198, 7)',
                    'rgb(0, 0, 0, 0)',
                ],
                backgroundColor: [
                  'rgb(241, 198, 7)',
                  'rgb(0, 0, 0, 0)',
                ],
                hoverOffset: 4,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            events: ["", "mouseout", "", "", "touchmove", "touchend"],
            cutout:'90%',
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