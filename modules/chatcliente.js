var nombre,pswd;
var arrayNames = {};
var websocket = io.connect();

$(document).on("ready",iniciar);

function iniciar()
{
    $("#body").css({height:screen.height,width:screen.width})

}
