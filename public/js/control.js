$(document).ready(() =>
{
    $('.input-field > img').click(function ()
    {
        $(this).prev().prev().attr('type',$(this).prev().prev().attr('type') == 'text'? 'password':'text')
        $(this).attr('src', $(this).attr('src') == '/img/icons/icons8_Eye_32px.png' ? '/img/icons/icons8_Invisible_32px.png' : '/img/icons/icons8_Eye_32px.png')
    })

    $('form').keyup(function ()
    {
        $('#submit').prop('disabled', ($('#nueva').val() != '' && $('#confirmacion').val() != '' && $('#antigua').val() != '') && ($('#nueva').val() == $('#confirmacion').val()) ? false : true)
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
})
