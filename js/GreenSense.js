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
        }
        else if ($("#chart-air").is(":visible")){
            $("#chart-air").hide();
            $("#chart-trash").show();
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