$(document).ready(function() {
    const socket = io('http://31.220.53.147:8081', {forceNew: true});
    const $msg_text = $('#message-text');
    function mandarMsj() {
        const msg = $msg_text.val();

        socket.emit('new_message', msg);
        $msg_text.val(null);
        return false;
    }
    $msg_text.keypress(e => {
        if ((e.keyCode || e.which) === 13)
            mandarMsj()
    });

    $('#enviar').click(mandarMsj);

    socket.on('new_user', newUser =>{
      console.log(NewUser);
    });


    // CHAT VALIDACIÓN SENCILLA
    const createMessageNode = mensaje => {
        const li = document.createElement("li");
        li.className = "yo";

        const div = document.createElement("div");
        div.className = "msg";

        const p = document.createElement("p");
        p.textContent = mensaje;

        div.appendChild(p);
        li.appendChild(div);
        return li;
    };

    socket.on('new_message', mensaje =>{
        const chat = document.querySelector("#chat");
        const msg_node = createMessageNode(mensaje);
        chat.appendChild(msg_node);
    });
});
