
$(document).ready(function() {


    alert("Llego aca 1")
    var socket = io('http://localhost:8081', {forceNew: true})
    alert("LLego aqui 2")

    $('#enviar').click(function(){
        alert("Inicio funcion")
        //e.preventDefault()
        socket.emit('new_message', $('#message-text').val());
        alert("Llego aca 3")
        $('#message-text').val(null)
        return false
    })

    socket.on('new_user', function (newUser){
      alert(newUser.message)
    })

    socket.on('user_says', function (userSays){
      $('#chat').append('<li>' + userSays + '</li>')
      alert(userSays)
    })

})//(document, io, jQuery)
