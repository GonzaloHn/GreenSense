var num_val=1;

var socket = io('http://localhost:4000');

socket.on('aire', (data_s_air) =>{
  console.log("Socket basura: " + data_s_air);
  num_val = data_s_air;
})

// setup 
const data = {
    labels: [
      'Green',
      'Blue',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [1, 99],
      borderColor: [
          'rgb(0, 255, 255)',
          'rgb(0, 255, 255, 0.1)',
      ],
      backgroundColor: [
        'rgb(0, 255, 255)',
        'rgb(0, 255, 255, 0.1)',
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

      const val_actual = 'Valor actual: ' + num_val + 'ppm';

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

function updateChart(){
  var empty_val = 30;
  if (num_val > 30){
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

$(document).ready(function(){

  setInterval(swapSitNow,1000);
  function swapSitNow(){
      if(num_val <= 100){
        $(".Situation-Now-Title").text('Valores correctos');
        $(".Situation-Now-Text").html("La calidad de aire actual es aceptable.");
      } else if(num_val > 100 && num_val <= 180){
        $(".Situation-Now-Title").html("Valores arreiesgados");
        $(".Situation-Now-Text").html("La calidad de aire actual no es la indicada.");
      } else if (num_val > 180){
        $(".Situation-Now-Title").html("Valores perjudiciales");
        $(".Situation-Now-Text").html("La caidad de aire actual es perjudicial.");
      }        
  }
    
});