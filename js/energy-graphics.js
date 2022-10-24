// setup 
const data = {
    labels: [
      'Green',
      'Blue',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [60, 40],
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
};
  
//centerText plugin
const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options) {
      const { ctx, chartArea: {left, right, top, bottom, width, height} } = chart;
  
      ctx.save();
      console.log(top);
  
      ctx.font = 'bolder 25px Arial';
      ctx.fillStyle = 'rgba(1, 1, 1)';
      ctx.textAlign = 'center';
      ctx.fillText('Energía', width / 2, height / 2 - 60);
      ctx.restore();
  
      ctx.font = 'bolder 25px Arial';
      ctx.fillStyle = 'rgba(1, 1, 1)';
      ctx.textAlign = 'center';
      ctx.fillText('eléctrica', width / 2, height / 2 - 30);
      ctx.restore();

      const val_actual = 'Valor actual: numero';

      ctx.font = 'bolder 30px Arial';
      ctx.fillStyle = 'rgba(1, 1, 1)';
      ctx.textAlign = 'center';
      ctx.fillText(val_actual, width / 2, height / 2 + top);
      ctx.restore();
    }
  }
  
  // config 
  const config = {
    type: 'doughnut',
    data,
    options: {
      responsive: true,
      events: ["", "mouseout", "", "", "touchmove", "touchend"],
      cutout:'90%',
      plugins: {
        legend: {
           display: false
        },
    }
    }, 
    plugins: [
      centerText
    ]
};
  
  // render init block
const myChart = new Chart(
    document.getElementById('donut-chart-energy'),
    config
);
// $(document).ready(function(){

//     $(window).resize(function() {
//         var widthBrowser =$(window).height();
//         var heightBrowser =$(window).width();
//         console.log("Tamaño de la pantalla del navegador: width="+widthBrowser +" height="+heightBrowser );
//     });

//     // const centerText = {
//     //     id = 'centerText',
//     //     afterDatasetsDraw(chart, args, options) {
//     //         const { donut_energy, chartArea: {left, right, top, bottom, width, height } } = chart;

//     //         donut_energy.save();
//     //         console.log(top);

//     //         donut_energy.font = 'bolder 30px Arial';
//     //         donut_energy.fillStyle = 'rgba(255, 26, 104, 1)';
//     //         donut_energy.fillText('Sales:', 100, 100)
//     //     }
//     // }
//     const centerText = {
//         id: 'centerText',
//         afterDatasetsDraw(chart, args, options) {
//           const { donut_energy, chartArea: {left, right, top, bottom, width, height} } = chart;
  
//           donut_energy.save();
//           console.log(top);
  
//           donut_energy.font = 'bolder 30px Arial';
//           donut_energy.fillStyle = 'rgba(1, 11, 21)';
//           donut_energy.textAlign = 'center';
//           donut_energy.fillText('Prueba', width / 2, height / 2);
//           donut_energy.restore();
  
//           donut_energy.font = 'bolder 30px Arial';
//           donut_energy.fillStyle = 'rgba(54, 162, 235)';
//           donut_energy.textAlign = 'center';
//           donut_energy.fillText('Prueba', width / 2, height / 2 + top);
//           donut_energy.restore();
//         }
//     }

//     const donut_energy = $('#donut-chart-energy');
//     const donut_chart_energy = new Chart(donut_energy, {
//         type: 'doughnut',
//         data: {
//             labels: [
//                 'Green',
//                 'Blue',
//               ],
//               datasets: [{
//                 label: 'My First Dataset',
//                 data: [60, 40],
//                 borderColor: [
//                     'rgb(241, 198, 7)',
//                     'rgb(0, 0, 0, 0)',
//                 ],
//                 backgroundColor: [
//                   'rgb(241, 198, 7)',
//                   'rgb(0, 0, 0, 0)',
//                 ],
//                 hoverOffset: 4,
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             events: ["", "mouseout", "", "", "touchmove", "touchend"],
//             cutout:'90%',
//             plugins: {
//                 legend: {
//                    display: false
//                 },
//             },
//         },
//         plugins: [
//             centerText
//         ]
//         // plugins: [centerText],

//     });
//     });