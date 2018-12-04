$(document).ready(function() {
    const socket = io('/', {forceNew: true});
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
    const createMessageYo = mensaje => {
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
    // CHAT VALIDACIÓN SENCILLA
    const createMessageOtro = mensaje => {
        const li = document.createElement("li");
        li.className = "other";

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
        const msg_node = createMessageOtro(mensaje);
        chat.appendChild(msg_node);
    });
    socket.on('mi_message', mensaje =>{
        const chat = document.querySelector("#chat");
        const msg_node = createMessageYo(mensaje);
        chat.appendChild(msg_node);
    });
});
