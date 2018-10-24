
$(document).ready(function() {


    alert("Llego aca 1")
    var socket = io('http://localhost:8081', {forceNew: true})
    alert("LLego aqui 2")

    $('#enviar').click(function(){
        alert("Inicio funcion")
        socket.emit('new_message', $('#message-text').val());
        alert("Llego aca 3")
        $('#message-text').val(null)
        return false
    })

    socket.on('new_user', function(newUser){
      alert(newUser.message)
      alert("LLego aqui 4")
    })

    socket.on('new_message', (mensaje) =>{
      $('#chat').append('<li>' + mensaje + '</li>')
    });

    alert("LLego aqui 5")
    socket.on('user_says', function(userSays){
      alert("LLego aqui 6")
      $('#chat').append('<li>' + userSays + '</li>')
      alert("El mensaje es: " + userSays)
    })

})//(document, io, jQuery)
