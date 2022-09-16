$(document).ready(function(){

    //FRONT-END

    $("#fR").click(function(){
        $("body").css("background-color","#FF0000");
    });

    $("#fA").click(function(){
        $("body").css("background-color","#FFFF00");
    });

    $("#fV").click(function(){
        $("body").css("background-color","#008000");
    });


    $("#hide-g").click(function(){
        if ($("#show-g").is(":visible")){
        $("#show-g").hide();
        }else if($("#show-g").is(":hidden")){
            $("#show-g").show();
        }
    });
});