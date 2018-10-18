$(document).ready(() =>
{
    $('.ipt > img').click(function ()
    {
        $(this).prev().attr('type',$(this).prev().attr('type') == 'text'? 'password':'text')
        $(this).attr('src', $(this).attr('src') == '/img/icons/icons8_Eye_32px.png' ? '/img/icons/icons8_Invisible_32px.png' : '/img/icons/icons8_Eye_32px.png')
    })
})
