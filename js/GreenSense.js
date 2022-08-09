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
                    ;
                   },
            });

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