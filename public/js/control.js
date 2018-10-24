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
})
