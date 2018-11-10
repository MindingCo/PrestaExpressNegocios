
$(document).ready(function()
{
    var socket = io('http://'+location.hostname+':8081', {forceNew: true})
    function mandarMsj()
    {
        socket.emit('new_message', $('#message-text').val());
        $('#message-text').val(null)
        return false
    }
    $("#message-text").keypress(function(e)
    {
        if(e.which == 13)
            mandarMsj()
    })

    $('#enviar').click(function(){ mandarMsj() })


    socket.on('new_user', (newUser) =>{
      console.log("NewUser")
    })

    socket.on('new_message', (mensaje) =>{
      $('#chat').append('<li>' + mensaje + '</li>')
    });

    socket.on('user_says', function(userSays){
      $('#chat').append('<li>' + userSays + '</li>')
    })

})
