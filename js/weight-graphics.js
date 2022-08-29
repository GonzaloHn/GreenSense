$(document).ready(function(){
    // const line_energy = $('#line-chart-energy');
    // const line_chart_energy = new Chart(line_energy, {
    //     type: 'line',
    //     data: {
    //         labels: ["a", "b", "c", "d", "e", "f", "g"],
    //         datasets: [{
    //             label: 'My First Dataset',
    //             data: [65, 59, 80, 81, 56, 55, 40],
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
    
    const donut_weight = $('#donut-chart-weight');
    const donut_chart_weight = new Chart(donut_weight, {
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
                  'rgb(241, 7, 7)',
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
    // $("#hide-a-g").hide();
    // $("#hide-t-g").hide();
    
    // $("#change-g").click(function(){
    //     if ($("#hide-e-g").is(":visible")){
    //         $("#hide-e-g").hide();
    //         $("#hide-a-g").show();
    //         $("#hide-a-g").removeClass("none");
    //     }
    //     else if ($("#hide-a-g").is(":visible")){
    //         $("#hide-a-g").hide();
    //         $("#hide-t-g").show();
    //     }
    //     else if ($("#hide-t-g").is(":visible")){
    //         $("#hide-t-g").hide();
    //         $("#hide-e-g").show();
    //     }
    // });
    });