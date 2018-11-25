(() => {
    const validatePassword = (msg_field, password) => {
        if (!password.length)
            return `Escriba la ${msg_field}`;
        if (password.length < 7)
            return `La ${msg_field} debe ser mayor a 6 caracteres`;
        if (password.length > 16)
            return `La ${msg_field} debe ser menor a 17 caracteres`;
        return false;
    };

    const setInputInvalid = (input, msg) => {
        input.parentNode.querySelector(".helper-text").textContent = msg;
        return false;
    };

    document.addEventListener("DOMContentLoaded", () => {
        const form = document.querySelector("#modify");
        const input_curr_password = form.querySelector("#antigua");
        const input_new_password = form.querySelector("#nueva");
        const input_confirm_new_password = form.querySelector("#confirmacion");
        form.onsubmit = function(event) {
            event.preventDefault();

            // CURRENT PASSWORD VALIDATION
            const current_password = input_curr_password.value;
            const invalid_current_password = validatePassword("contraseña actual", current_password);
            if (invalid_current_password)
                return setInputInvalid(input_curr_password, invalid_current_password);

            // NEW PASSWORD VALIDATION
            const new_password = input_new_password.value;
            const invalid_new_password = validatePassword("contraseña nueva", new_password);
            if (invalid_new_password)
                return setInputInvalid(input_new_password, invalid_new_password);

            // PASSWORD CONFIRMATION VALIDATION
            const confirm_new_password = input_confirm_new_password.value;
            if (input_new_password === confirm_new_password) {
                input_confirm_new_password.className = input_confirm_new_password.className.replace(" valid", " invalid");
                return setInputInvalid(input_confirm_new_password, "Las contraseñas no coinciden");
            }

            form.submit();
        };
        form.onkeyup = function() {
            let invalid = validatePassword("contraseña actual", input_curr_password.value);
            setInputInvalid(input_curr_password, invalid || '');

            invalid = validatePassword("contraseña nueva", input_new_password.value);
            setInputInvalid(input_new_password, invalid || '');

            if (input_confirm_new_password.value !== input_new_password.value) {
                input_confirm_new_password.className = input_confirm_new_password.className.replace(" valid", " invalid");
                setInputInvalid(input_confirm_new_password, "Las contraseñas no coinciden");
            } else {
                input_confirm_new_password.className = input_confirm_new_password.className.replace(" invalid", " valid");
                setInputInvalid(input_confirm_new_password, '');
            }
        };
    });
})();
