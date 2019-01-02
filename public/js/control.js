// if (document.location.hostname == '31.220.53.147')
//     document.location.replace('https://prestaexpressnegocios.me')
var map;
var cliente;
var ubicacion;
var MEXICO_BOUNDS = {
        north: 19.592757,
        south: 19.188769,
        west: -99.326537,
        east: -98.960461,
      };
$(document).ready(function ()
{
    loader(false)
    $('a').parent('li').css({"cursor": "pointer"})
    $('.chat-animation').css({"cursor": "pointer"})

    $('#content').change(function () {
        $('select').formSelect()
        $('select[name=tipo]').change(function () {
            if($(this).val() == 1)
                $('#extracamp').html('<div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="dirc" placeholder="Direccion de casa" required /> </div> </div> <div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="dirn" placeholder="Direccion de negocio" required /> </div> </div>')
            if($(this).val() == 2)
            {
                $('#extracamp').html('<div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <input type="text" name="supe" placeholder="Gerente correspondiente" required /> </div> </div> <div class="camp"> <div class="ipt col full m-three_quarters l-two_thirds xl-seven_twelfths"> <select name="zona" form="Agregarusu" required > <option disabled selected> Zona </option> <option value="1"> Norte </option> <option value="2"> Sur </option> <option value="3"> Este </option> <option value="4"> Oeste </option> </select> </div> </div>')
                $('select').formSelect();
            }
            if($(this).val() == 3)
                $('#extracamp').html('')
        })
    })
    $('#modificar-pass').click(function ()
    {
        alert('hola')
        // $.ajax(
        // {
        //     method:'POST',
        //     url: '/sesion',
        //     data:
        //     {
        //         contraactual: $('#antigua').value(),
        //         newcontra: $('#nueva').value(),
        //         connewcontra: $('#confirmacion').value()
        //     },
        //     success: function (result)
        //     {
                // alert('adios');
        //         $('#message').html(result);
        //     }
        // })
    })

    $('.input-field > img').click(function ()
    {
        $(this).prev().prev().attr('type',$(this).prev().prev().attr('type') == 'text'? 'password':'text')
        $(this).attr('src', $(this).attr('src') == '/img/icons/icons8_Eye_32px.png' ? '/img/icons/icons8_Invisible_32px.png' : '/img/icons/icons8_Eye_32px.png')
    })

    $('.catch-chat').click(function () { $('.chat-container').animate({right: "100%"}, 1000) })
    $('.chat-animation').click(function () { $('.chat-container').animate({right: "0%"}, 1000) })

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
    // alert('document listo x2')
})

function initMap() {
    $.ajax({
        method: "POST",
        url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDcgh5YYJeQJJ8NpN78zlR1VAm8ax4bANM",
        beforeSend: function () { loader(true);},
        error: function (result) { alert('Hubo un error'); alert(result.message); },
        complete: function () { loader(false); },
        success: function(result) {
            ubicacion = result.location
            map = new google.maps.Map(document.getElementById('map'),
            {
                center: ubicacion,
                zoom: 17,
                restriction: { latLngBounds: MEXICO_BOUNDS, strictBounds: false, },
                streetViewControl: false,
                fullscreenControl: true,
                fullscreenControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM },
                zoomControl: false,
                mapTypeControl: false
            })
            cliente = new google.maps.Marker({position: ubicacion, map: map});
        }
    });
}
function center(coords) {
    map.setCenter(coords)
    cliente.position = coords;
}

function loader(bol) {
    $('#loader').css({"display": (bol?"initial":"none")})
}

function go(site, values, method) {
    $.ajax({
        method: method?method:"GET",
        url: site,
        data: values,
        beforeSend: function () {
            loader(true)
        },
        success: function(result)
        {
            $('#content > div').html(result)
            $('select').formSelect()
            loader(false)
        }
    })
}
function changePass(e) {
    alert('Empieza form x2')


        alert('Empieza form')
        e.preventDefault(); // no page reload
        $.ajax(
        {
            method:'post',
            url: $('form#modify').attr('action'),
            data: $('form#modify').serialize(),
            timeout: 30000,
            beforeSend: function () { loader(true) },
            success: function (result, textStatus, jqXHR)
            {
                alert('success');
                alert(result)
                alert(textStatus)
                alert(jqXHR)
                $('#message').html(result);
                loader(false)
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                alert('Hubo un error')
                alert(jqXHR)
                alert(textStatus)
                alert(typeof errorThrown)
                loader(false)
            },
            complete: function (jqXHR, textStatus )
            {
                alert('completado')
                alert(jqXHR)
                alert(textStatus)
                loader(false)
            }
    });
}
