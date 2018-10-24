(function (d,io,$){
    'use strict'
    alert("Llego aca 1")
    var io = io('http://localhost:8081', {forceNew: true})
    alert("LLego aqui 2")

    $('#chat-form').on('submit', function (e){
        alert("Inicio funcion")
        e.preventDefault()
        io.emit( 'new message', $('#message-text').val() )
        alert("Llego aca 3")
        $('#message-text').val(null)
        return false
    })

    io.on('new user', function (newUser){
      alert(newUser.message)
    })

    io.on('user says', function (userSays){
      $('#chat').append('<li>' + userSays + '</li>')
      alert(userSays)
    })

})(document, io, jQuery)
