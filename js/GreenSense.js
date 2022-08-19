$(document).ready(function(){

    $("#S").click(function(){
        $.ajax({
              type: 'POST',
              url: '../php/registrar.php',
              dataType: "json",
              data: 'usu=' + $("#u").val() + '&pass='+ $("#c").val() + '&ema='+ $("#m").val(),
              success: function (datos) {
                    if(datos.status == 'ok')
                    {
                        window.location.assign("../html/index.html");
                    }
                    else if (datos.status == 'err')
                    {
                        mensaje="Usuario y contraseña existente";
                        $("#divt").html(mensaje);
                        $("#divt").show();
                    }
                    else
                    {
                        mensaje="Ocurrio un error";
                        $("#divt").html(mensaje);
                        $("#divt").show();
                    }
                },
              error: function(error) {
                    
                   },
            });

    });

    //FRONT-END
    //Solo un gráfico a la vez

    $("#chart-energy").show();
    //$("#chart-air").hide();
    //$("#chart-trash").hide();

    $("#change-g").click(function(){
        if ($("#chart-energy").is(":visible")){
            $("#chart-energy").hide();
            $("#chart-air").show();
            $("#chart-air").empty();
            $("#chart-air svg").remove();
            new Morris.Line({
                // ID of the element in which to draw the chart.
                element: 'chart-air',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: [
                  { year: '2008', value: 4 },
                  { year: '2009', value: 4 },
                  { year: '2010', value: 5 },
                  { year: '2011', value: 10 },
                  { year: '2012', value: 9 }
                ],
                // The name of the data record attribute that contains x-values.
                xkey: 'year',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['value'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Value'],
                resize: true,
                redraw: true
            });
        }
        else if ($("#chart-air").is(":visible")){
            $("#chart-air").hide();
            $("#chart-trash").show();
            $("#chart-trash").empty();
            $("#chart-trash svg").remove();
            new Morris.Line({
                // ID of the element in which to draw the chart.
                element: 'chart-trash',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data: [
                  { year: '2008', value: 5 },
                  { year: '2009', value: 10 },
                  { year: '2010', value: 30 },
                  { year: '2011', value: 50 },
                  { year: '2012', value: 20 }
                ],
                // The name of the data record attribute that contains x-values.
                xkey: 'year',
                // A list of names of data record attributes that contain y-values.
                ykeys: ['value'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels: ['Value'],
                resize: true
            });
        }
        else if ($("#chart-trash").is(":visible")){
            $("#chart-trash").hide();
            $("#chart-energy").show();
        }
    });

    $("#fR").click(function(){
        $("body").css("background-color","#FF0000");
    });

    $("#fA").click(function(){
        $("body").css("background-color","#FFFF00");
    });

    $("#fV").click(function(){
        $("body").css("background-color","#008000");
    });
    
});