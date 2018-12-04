if (document.location.hostname == '31.220.53.147')
    document.location.replace('https://prestaexpressnegocios.me')
$(document).ready(() =>
{
    $('.input-field > img').click(function ()
    {
        $(this).prev().prev().attr('type',$(this).prev().prev().attr('type') == 'text'? 'password':'text')
        $(this).attr('src', $(this).attr('src') == '/img/icons/icons8_Eye_32px.png' ? '/img/icons/icons8_Invisible_32px.png' : '/img/icons/icons8_Eye_32px.png')
    })

    $('.catch-chat').click(function ()
    {
        $('.chat-container').animate({right: "100%"}, 1000)
    })
    $('.chat-animation').click(function ()
    {
        $('.chat-container').animate({right: "0%"}, 1000)
    })

    $(".first_part-form").click(function()
    {
        let form = $(this).parent('form')
        if (form.attr('actived-second_part') == 'false')
        {
            form.attr('actived-second_part', 'true')
            $.ajax ({
                url: "/form_cobros.html",
                success: function(result) {
                    form.append(result);
                    form.children(".second_part-form").hide(0, function ()
                    {
                        form.children(".second_part-form").show(1000)
                    })
                }
            });
        }
        else
        {
            form.attr('actived-second_part', 'false')
            form.children(".second_part-form").hide(500, function ()
            {
                form.children(".second_part-form").remove()
            })
        }
    })
    $('select').formSelect();
    $('[name=tipo]').change(function () {
        if($(this).val() == 1)
            $('#extracamp').html('<div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="dirc" placeholder="Direccion de casa" required /> </div> </div> <div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="dirn" placeholder="Direccion de negocio" required /> </div> </div>')
        if($(this).val() == 2)
            $('#extracamp').html('<div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="supe" placeholder="Gerente correspondiente" required /> </div> </div> <div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="zona" placeholder="Zona" required /> </div> </div>')
        if($(this).val() == 3)
            $('#extracamp').html('<div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="zona" placeholder="Zona" required /> </div> </div>')
        if($(this).val() == 4)
            $('#extracamp').html('')
    });
})
