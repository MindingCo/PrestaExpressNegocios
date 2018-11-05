function validar(formulario){
if (formulario.nombre.value.length < 5) {
alert("Escriba por lo menos 5 caracteres en el campo Nombre.");
formulario.nombre.focus();
return (false);
}

var checkOK = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú ";
var checkStr = formulario.nombre.value;
var allValid = true;

for (i = 0; i < checkStr.length; i++) {
ch = checkStr.charAt(i);
for (j = 0; j < checkOK.length; j++)
if (ch == checkOK.charAt(j))
break;

if (j == checkOK.length) {
allValid = false;
break;
}
}

if (!allValid) {
alert("Escriba sólo letras en el campo Nombre.");
formulario.nombre.focus();
return (false);
}

if (formulario.edad.value.length < 2) {
alert("Escriba 2 digitos en el campo Edad");
formulario.edad.focus();
return (false);
}

var checkOK = "0123456789";
var checkStr = formulario.edad.value;
var allValid = true;

for (i = 0; i < checkStr.length; i++) {
ch = checkStr.charAt(i);
for (j = 0; j < checkOK.length; j++)
if (ch == checkOK.charAt(j))
break;
if (j == checkOK.length) {
allValid = false;
break;
}
}
if (!allValid) {
alert("Escriba sólo números en el campo Edad.");
formulario.edad.focus();
return (false);
}

if (formulario.correo.value.length < 2) {
alert("Escriba el correo de la forma xx.@xx.com");
formulario.correo.focus();
return (false);
}

var txt = formulario.correo.value;
var b=/^[^@\s]+@ [^@\.\s]+(\.[^@\.\s]+)+$/ 
alert("Email " + (b.test(txt)?"":"no ") + "válido.") 
return b.test(txt);

}