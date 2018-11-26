// TODO: MAKE THIS ROUTES IN SERVER:
// search_client
// register_payment
(() => {
    const searchClients = client_search => {
        $.ajax({
            type: "POST",
            url: "search_client",
            data: client_search,
            success: (result, status, xhr) => {
                console.log(result, status, xhr);
            }
        });
    };

    const validateAmount = amount => {
        if (!amount.length)
            return "Escribe un monto (sin notación exponencial)";
        if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(amount))
            return "Escriba un monto válido, máximo 2 decimales y sin notación exponencial";
        if (amount.length > 8)
            return "El monto es muy grande";
        if (parseFloat(amount) === 0)
            return "El monto no puede ser 0";
        return false;
    };

    function registerPayment(event) {
        event.preventDefault();
        const amount_input = this.querySelector("input");
        const amount = amount_input.value;
        const invalid = validateAmount(amount);
        if (invalid)
            return changeHelperText(amount_input.parentNode, invalid);
        $.ajax({
            type: "POST",
            url: "register_payment",
            data: amount,
            success: (result, status, xhr) => {
                console.log(result, status, xhr);
            }
        });
        return false;
    }

    const changeHelperText = (node, message) => {
        node.querySelector(".helper-text").textContent = message;
    };

    document.addEventListener("DOMContentLoaded", () => {
        const search_input = document.querySelector("#search-input");
        const eventSearchFn = e => {e.preventDefault();searchClients(search_input.value);return false;};
        document.querySelector("#search").onsubmit = eventSearchFn;
        search_input.addEventListener("keypress", eventSearchFn);

        const validateAmountOnInput = function() {
            const amount = this.value;
            const invalid = validateAmount(amount);
            return changeHelperText(this.parentNode, invalid || '');
        };

        const forms_register_payment = document.querySelectorAll("form.register-payment");
        for (let form of forms_register_payment) {
            form.addEventListener("submit", registerPayment);
            form.querySelector("input").addEventListener("input", validateAmountOnInput);
        }
    });
})();