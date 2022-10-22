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

    ctx.font = 'bolder 30px Arial';
    ctx.fillStyle = 'rgba(1, 11, 21)';
    ctx.textAlign = 'center';
    ctx.fillText('Prueba', width / 2, height / 2);
    ctx.restore();

    ctx.font = 'bolder 30px Arial';
    ctx.fillStyle = 'rgba(54, 162, 235)';
    ctx.textAlign = 'center';
    ctx.fillText('Prueba', width / 2, height / 2 + top);
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
  document.getElementById('Chart'),
  config
);