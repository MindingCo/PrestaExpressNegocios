const valids = {};


let regex = /^[a-zàèìòùñA-ZÀÈÌÒÙÑ0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;

//var rcor=/^[^@\s]+@ [^@\.\s]+(\.[^@\.\s]+)+$/;
var expnum= /^\d+$/;
var sletras= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú";
var nums= "0123456789";
var letrasynums = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú" + "0123456789";
var coment = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú" + "0123456789" + "%+-#";
var allValid = false;
var direc= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ" + "abcdefghijklmnñopqrstuvwxyzáéíóú" + "0123456789" + "#";

valids.login = (nombre, contraseña) =>{
  if (contraseña.length < 6 || contraseña.length > 17 || !contraseña.length)
    return "La cotraseña debe tener al menos 6 caracteres y no debe pasar los 17 caracteres"
  if(!nombre.length || nombre.length > 30)
    return "Debes ingresar un nombre de usuario no mayor a 30 caracteres"
  if (!isNaN(nombre) || !isNaN(contraseña))
    return "No pueden ser solo números el nombre de usuario ni la contraseña"

  for (i = 0; i < nombre.length; i++)
      var ch = nombre.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
        if (ch == letrasynums.charAt(j))
          break;
        if (j == letrasynums.length)
          return "En el nombre de usuario solo se debe poner letras y números";

  for (i = 0; i < contraseña.length; i++)
      ch = contraseña.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
        if (ch == letrasynums.charAt(j))
          break;
        if (j == letrasynums.length)
          return "Solo debes ingresar letras en la contraseña (Puedes añadir números).";
  return allValid;
};

valids.contra = (contra, msg_field) =>{
    if (contra.length < 6)
      return `La ${msg_field} debe ser mayor a 6 caracteres`;
    if (contra.length > 17)
        return `La ${msg_field} no debe ser mayor a 17 caracteres`;
    if (!isNaN(contra))
      return `La ${msg_field} no puede ser solo números`;
    if (!contra.length)
      return `Ingresa la ${msg_field}`;
    for (i = 0; i < contra.length; i++)
      ch = contra.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
        if (ch == letrasynums.charAt(j))
          break;
        if (j == letrasynums.length)
          return `La ${msg_field} solo debe tener letras (Puedes añadir números).`;

    return allValid;
};


valids.pago = (pago) =>{
  console.log('1 '+pago.montorecibido);
  console.log('2 '+pago.comen);
  if (pago.montorecibido < 0)
    return "El monto no puede ser menor que 0"
  if (pago.montorecibido.length > 4)
    return `El monto recibido no puede tener más de 4 cracateres`;
  if (pago.comen.length)
    if(!isNaN(pago.comen))
      return 'El comentario no puede tener sólo números';
  if(pago.comen.length > 200)
      return 'El comentario no puede tener más de 200 caracteres'
  if (!pago.montorecibido.length)
    return `Ingresa el monto`;
  if (!expnum.test(pago.montorecibido))
    return "Solo se aceptan números en el monto"

  if (pago.comen.length)
        for (i = 0; i < pago.comen.length; i++)
            ch = pago.comen.charAt(i);
            for (j = 0; j < coment.length; j++)
              if (ch == coment.charAt(j))
                break;
              if (j == coment.length)
                return "Comentario solo puede tener letras, números y los siguientes caracteres: %,+,-,#";

  return allValid;
};

valids.prestamo = (prestamo) =>{
  if(!prestamo.montoi.length || !prestamo.montod.length || !prestamo.cliente.length || !prestamo.asesor.length)
    return "Debes llenar todos los campos";
  if(prestamo.cliente.length > 45 || prestamo.cliente.length < 9)
    return "El nombre del cliente ser menor a 45 caracteres y mayor a 9";
  if(prestamo.asesor.length > 45 || prestamo.asesor.length < 9)
    return "El nombre del asesor debe ser menor a 45 caracteres y mayor a 9";
  if(!isNaN(prestamo.cliente) || !isNaN(prestamo.asesor))
    return `Los nombres no pueden ser solo números`;
  if (!expnum.test(prestamo.montoi) || !expnum.test(prestamo.montod))
    return "Solo se aceptan números en los montos";
  if(prestamo.montoi > 10000 || prestamo.montoi < 1000)
    return "Solo puedes agregar un préstamo entre 1000 y 10000 pesos";
  if(prestamo.montod.length < 2)
    return "El monto a pagar diariamente debe tener al menos 2 números";
  if(prestamo.montod >= prestamo.montoi)
    return "El monto a dar por día debe ser menor al monto prestado";
  if(prestamo.montoi < 0 || prestamo.montod < 0)
    return "No puedes ingresar montos negativos";

  //Nombres
  for (i = 0; i < prestamo.cliente.length; i++)
      ch = prestamo.cliente.charAt(i);
      for (j = 0; j < sletras.length; j++)
        if (ch == sletras.charAt(j))
          break;
        if (j == sletras.length)
          return "Solo ingresa letras en el nombre del cliente";
  for (i = 0; i < prestamo.asesor.length; i++)
      ch = prestamo.asesor.charAt(i);
      for (j = 0; j < sletras.length; j++)
          if (ch == sletras.charAt(j))
            break;
          if (j == sletras.length)
            return "Solo ingresa letras en el nombre del asesor";


  return allValid;
};

valids.username = username =>{
  if(!username.length || username.length > 15)
    return 'Ingresa un nombre con menos de 16 caracteres';
  if (!isNaN(username))
      return "No puede ser solo números el nombre de usuario";
  for (i = 0; i < username.length; i++)
      ch = username.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
        if (ch == letrasynums.charAt(j))
          break;
        if (j == letrasynums.length)
          return "En el nombre de usuario solo se debe poner letras y números";
  return allValid;
};

valids.cliente = cliente => {
  if(!cliente.nombre.length || !cliente.password.length || !cliente.dirn.length || !cliente.tel.length || !cliente.dirc.length || !cliente.email.length)
    return "Debes llenar todos los campos";
  if(cliente.nombre.length > 45 || cliente.nombre.length < 9)
    return "El nombre debe ser menor a 45 caracteres y mayor a 9";
  if (cliente.password.length > 17 || cliente.password.length < 6)
    return "La contraseña no puede ser menor a 17 caracteres y mayor que 6";
  if (cliente.tel.length != 8 && cliente.tel.length != 10)
    return "El número debe ser de 8 o 10 dígitos";
  if (cliente.dirn.length > 100 || cliente.dirc.length > 100)
    return "Las direcciones no pueden ser mayor a 100 caracteres";
  if (cliente.email.length > 50 || cliente.email.length < 5)
    return "El email no puede ser mayor a 50 caracteres ni menor de 5";
  if (!expnum.test(cliente.tel))
    return "Ingresa solo números en el número telefónico";
  if (!isNaN(cliente.password))
    return `La contraseña no puede ser solo números`;
  if (!isNaN(cliente.dirn) || !isNaN(cliente.dirc))
      return `Las direcciones no pueden ser solo números`;
  if (!regex.test(cliente.email))
        return "Ingresa un correo electronico valido";

  //Nombre
  for (i = 0; i < cliente.nombre.length; i++)
      ch = cliente.nombre.charAt(i);
      for (j = 0; j < sletras.length; j++)
        if (ch == sletras.charAt(j))
          break;
        if (j == sletras.length)
          return "Solo ingresa letras en el nombre";

  //Direcciones
  for (i = 0; i < cliente.dirc.length; i++)
      ch = cliente.dirc.charAt(i);
      for (j = 0; j < direc.length; j++)
          if (ch == direc.charAt(j))
            break;
          if (j == direc.length)
            return "Solo debes ingresar letras, números y si lo deseas el símbolo # en la dirección de casa";
  for (i = 0; i < cliente.dirn.length; i++)
      ch = cliente.dirn.charAt(i);
      for (j = 0; j < direc.length; j++)
            if (ch == direc.charAt(j))
                break;
            if (j == direc.length)
                return "Solo debes ingresar letras, números y si lo deseas el símbolo # en la dirección del negocio";

  //password
  for (i = 0; i < cliente.password.length; i++)
      ch = cliente.password.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
            if (ch == letrasynums.charAt(j))
                break;
            if (j == letrasynums.length)
                return "Solo debes ingresar letras en la contraseña (Puedes añadir números).";
  return allValid;
};

valids.asesor = asesor => {
  if(!asesor.nombre.length || !asesor.password.length || !asesor.supe.length || !asesor.tel.length || !asesor.email.length)
    return "Debes llenar todos los campos";
  if(asesor.nombre.length > 45 || asesor.nombre.length < 9)
    return "El nombre debe ser menor a 45 caracteres y mayor a 9";
  if(asesor.supe.length > 45 || asesor.supe.length < 9)
      return "El nombre del gerente debe ser menor a 45 caracteres y mayor a 9";
  if (asesor.password.length > 17 || asesor.password.length < 6)
  return "La contraseña no puede ser mayor a 17 caracteres ni menor que 6";
  if (asesor.tel.length != 8 && asesor.tel.length != 10)
    return "El número debe ser de 8 o 10 dígitos";
  if (asesor.email.length > 50 || asesor.email.length < 5)
    return "El email no puede ser mayor a 50 caracteres ni menor de 5";
  if (!regex.test(asesor.email))
    return "Ingresa un correo electronico valido";
  if (!expnum.test(asesor.tel))
    return "Ingresa solo números en el número telefónico";
  if (!isNaN(asesor.password))
    return `La contraseña no puede ser solo números`;
  if (asesor.zona != "1" && asesor.zona != "2" && asesor.zona != "3" && asesor.zona != "4" && asesor.zona && 1 && asesor.zona != 2 && asesor.zona != 3 && asesor.zona != 4)
    return `Ingresa una zona válida`;


  //Nombres
  for (i = 0; i < asesor.nombre.length; i++)
      ch = asesor.nombre.charAt(i);
      for (j = 0; j < sletras.length; j++)
        if (ch == sletras.charAt(j))
          break;
        if (j == sletras.length)
          return "Solo ingresa letras en el nombre";
  for (i = 0; i < asesor.supe.length; i++)
      ch = asesor.supe.charAt(i);
      for (j = 0; j < sletras.length; j++)
          if (ch == sletras.charAt(j))
            break;
          if (j == sletras.length)
            return "Solo ingresa letras en el nombre del gerente";

  //password
  for (i = 0; i < asesor.password.length; i++)
      ch = asesor.password.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
            if (ch == letrasynums.charAt(j))
                break;
            if (j == letrasynums.length)
                return "Solo debes ingresar letras en la contraseña (Puedes añadir números).";
  return allValid;
};

valids.gerente = gerente => {
  if(!gerente.nombre.length || !gerente.password.length || !gerente.tel.length || !gerente.email.length)
    return "Debes llenar todos los campos";
  if(gerente.nombre.length > 45 || gerente.nombre.length < 9)
    return "El nombre debe ser menor a 45 caracteres y mayor a 9";
  if (gerente.password.length > 17 || gerente.password.length < 6)
  return "La contraseña no puede ser mayor a 17 caracteres ni menor que 6";
  if (gerente.tel.length != 8 && gerente.tel.length != 10)
    return "El número debe ser de 8 o 10 dígitos";
  if (gerente.email.length > 50 || gerente.email.length < 5)
    return "El email no puede ser mayor a 50 caracteres ni menor de 5";
  if (!regex.test(gerente.email))
    return "Ingresa un correo electronico valido";
  if (!expnum.test(gerente.tel))
    return "Ingresa solo números en el número telefónico";
  if (!isNaN(gerente.password))
    return `La contraseña no puede ser solo números`;

  //Nombre
  for (i = 0; i < gerente.nombre.length; i++)
      ch = gerente.nombre.charAt(i);
      for (j = 0; j < sletras.length; j++)
        if (ch == sletras.charAt(j))
          break;
        if (j == sletras.length)
          return "Solo ingresa letras en el nombre";

  //password
  for (i = 0; i < gerente.password.length; i++)
      ch = gerente.password.charAt(i);
      for (j = 0; j < letrasynums.length; j++)
            if (ch == letrasynums.charAt(j))
                break;
            if (j == letrasynums.length)
                return "Solo debes ingresar letras en la contraseña (Puedes añadir números).";
  return allValid;
};


module.exports = valids;
