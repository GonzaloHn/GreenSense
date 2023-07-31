var num_val=1;

var socket = io('http://localhost:4000');

socket.on('basura', (data_s_weight) =>{
  console.log("Socket basura: " + data_s_weight);
  num_val = data_s_weight;
})

// setup 
const data = {
    labels: [
      'Green',
      'Blue',
    ],
    datasets: [{
      label: '',
      data: [1, 499],
      borderColor: [
          'rgb(255, 0, 7)',
          'rgb(255, 0, 7, 0.1)',
      ],
      backgroundColor: [
        'rgb(255, 0, 7)',
        'rgb(255, 0, 7, 0.1)',
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
      ctx.fillText('Peso', width / 2, height / 2 - 60);
      ctx.restore();
  
      ctx.font = 'bolder 25px Arial';
      ctx.fillStyle = 'rgba(1, 1, 1)';
      ctx.textAlign = 'center';
      ctx.fillText('de la basura', width / 2, height / 2 - 30);
      ctx.restore();

      var val_actual = 'Valor actual: ' + num_val + 'g';

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
    document.getElementById('donut-chart-weight'),
    config
);

function updateChart(){
  var empty_val = 500;
  if (num_val > 500){
    empty_val = 0;
  }else{
    empty_val = empty_val - num_val
  }
  var updateDisplay = [num_val, empty_val];
  // var updateVal = num_val;

  config.data.datasets[0].data = updateDisplay;
  console.log(config.data.datasets[0].data);
  myChart.update();
};
window.setInterval(function() {
  //num_val++;
  updateChart();  
}, 1000);