(function (d,io,$){
    'use strict'
    alert("Llego aca xD")
    var io = io()

    $('#chat-form').on('submit', function(e){
        e.preventDefault()
        io.emit( 'new message', $('#message-text').val() )
        alert("Llego aca")
        $('#message-text').val(null)
        return false
    })

    io.on('new user', function(newUser){
      alert(newUser.message)
    })

    io.on('user says', function(userSays){
      $('#chat').append('<li>' + userSays + '</li>')
      alert(userSays)
    })

})(document,io,jQuery)
