
$(document).ready(function()
{

    var socket = io('http://31.220.53.147:8081', {forceNew: true})
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
<<<<<<< HEAD
      $('#chat').append('<li>' + mensaje + '</li>')
    });


=======
      $('#chat').append('<li class="yo"> <div class="msg"> <p> '+ mensaje +' <p> </div> </li>')
    });


    socket.on('user_says', function(userSays){
      $('#chat').append('<li class="green">' + userSays + '</li>')
    })
>>>>>>> e6a37983d12a852b54b9561f8488d6e8c0315b5d

})
