// graph = new Dygraph(
//     document.getElementById("graph"),

//     "Year ,Fatalities\n" +
//     "2008, 200\n" +
//     "2009, 300\n" +
//     "2010, 200\n" +
//     "2011, 100\n" +
//     "2012, 500\n" +
//     "2012.4, 300\n" +
//     "2013, 200\n" +
//     "2014, 500\n" +
//     "2015, 900\n" +
//     "2016, 400\n" +
//     "2017, 600\n",

//     {
//         animatedZooms: true,
        
//         errorBars: true,
//     },
// )
var data = [];
var t = new Date();
for (var i = 10; i >= 0; i--) {
    var x = new Date(t.getTime() - i * 1000);
    data.push([x, Math.random()]);
} // todo esto sirve para agarrar el momento actual y guardarlo en el data de arriba

var g = new Dygraph(document.getElementById("graph"), data, {width:500, color:"yellow"}); //crea el nuevo grafico

window.setInterval(function() {
        var x = new Date(); 
        var y = Math.random(); //agarra un valor random para Y
        data.shift(); //remueve el primer dato del array, adelantando a todos los demas por uno adelante
        data.push([x, y]); //añade un nuevo elemtno al final de un array
        g.updateOptions( { 'file': data } ); //actualiza el grafico con nuevos valores, los de data
      }, 1000);

$(document).ready(function(){

  $("#test").click(function(){
    g.updateOptions({
      color: "peru",
      fillGraph: true, 
      zoomCallback: function() {
        this.resetZoom();
      }
    });
  });      
});

//Probando Socket.io

const socket = io('http://localhost:9000')
// const form = document.getElementById('sock')
// const input = document.getElementById('sock')

socket.on('basura', data => {
  console.log(data)
})

// info.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = input.value
//   socket.emit('send-chat-message', message)
//   input.value = ''
// })
