$(document).ready(function(){

    $("#S").click(function(){
        if (validar()){
            $.ajax({
                  type: 'POST',
                  url: '../php/registrar.php',
                  dataType: "json",
                  data: 'usu=' + $("#u").val() + 'pass='+ $("#c").val() + 'ema='+$("#m").val(),
                  success: function (datos) {
                        if(datos.status == 'ok'){
                            window.location.assign("../html/index.html");
                        }else if (datos.status=='err'){
                            mensaje="Usuario ya existente";
                               $("#divt").html(mensaje);
                               $("#divt").show();
                        }else{
                            mensaje="Ocurrio un error";
                               $("#divt").html(mensaje);
                               $("#divt").show();
                        }
                    },
                  error: function(error) {
                        ;
                       },
                });
            }
    });


});