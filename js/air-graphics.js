var socket = io('http://localhost:9000');

socket.on('aire', (data_s_air) =>{
  console.log("Socket calidad aire: " + data_s_air);
})

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
          'rgb(0, 255, 255)',
          'rgb(0, 0, 0, 0)',
      ],
      backgroundColor: [
        'rgb(0, 255, 255)',
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
      ctx.fillText('Calidad del', width / 2, height / 2 - 60);
      ctx.restore();
  
      ctx.font = 'bolder 25px Arial';
      ctx.fillStyle = 'rgba(1, 1, 1)';
      ctx.textAlign = 'center';
      ctx.fillText('aire', width / 2, height / 2 - 30);
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
    document.getElementById('donut-chart-air'),
    config
);