var pass = /[^<>"/;][\w+\d+\.\-]{6,18}/
var strS = /[^<>"/;][\w+\d+\. ]{1,30}/
var strL = /[^<>"/;][\w+\d+\. ]{1,200}/
var number = /[\d+\. ]{1,9}/
var mail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/

function valStr(str)
{
    String(str)
    return str.length > 200 ? false : true
}
