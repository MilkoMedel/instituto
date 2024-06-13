
// permitir solo numeros y letra k en input rut
function isNumber(evt){
    let charCode = evt.which;

    // Permitir números (códigos de tecla entre 48 y 57) y la letra 'K' (código de tecla 75)
    if ((charCode >= 48 && charCode <= 57) || charCode === 75) {
        return true;
    } else {
        return false;
    }
}

// Función para validar un RUT
function checkRut(rut) {
    // Verificar si el campo RUT está vacío o tiene menos de dos caracteres
    if (rut.value.length <= 0 ) {
        // Si es así, mostrar un mensaje indicando que se debe ingresar un RUT válido
        
    }

    // Limpiar el valor del RUT ingresado (quitar puntos y guiones)
    let valor = clean(rut.value);

    // Separar el cuerpo del RUT y el dígito verificador
    let bodyRut = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();

    // Formatear visualmente el RUT (agregar puntos y guión)
    rut.value = format(rut.value);

    // Calcular el dígito verificador utilizando el método del Módulo 11
    suma = 0;
    multiplo = 2;

    // Iterar sobre cada dígito del cuerpo del RUT
    for (i = 1; i <= bodyRut.length; i++) {
        // Obtener el producto del dígito por el multiplo correspondiente
        index = multiplo * valor.charAt(bodyRut.length - i);
        // Sumar al contador general
        suma = suma + index;

        // Consolidar el multiplo dentro del rango [2, 7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular el dígito verificador esperado según el Módulo 11
    dvEsperado = 11 - (suma % 11);

    // Manejar casos especiales (0 y K)
    dv = dv == "K" ? 10 : dv;
    dv = dv == 0 ? 11 : dv;

    // Verificar si el cuerpo del RUT tiene menos de 7 caracteres
    if (bodyRut.length <= 7) {
        // Si es así, mostrar un mensaje indicando que el RUT es demasiado corto
        rut.setCustomValidity("El RUT debe tener 8 o más dígitos.");
    }

    // Verificar si el dígito verificador esperado no coincide con el ingresado
    if (dvEsperado != dv ) {
        // Si no coincide, mostrar un mensaje indicando que el RUT es incorrecto
        rut.setCustomValidity("RUT Inválido");
        //mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>INCORRECTO</strong>.';
        return false;
        
    }else if(dv === "-"){
        // Si no coincide, mostrar un mensaje indicando que el RUT es incorrecto
        rut.setCustomValidity('');
        alert("campo vacio").show();
        return false;
    } else {
      // Si coincide, mostrar un mensaje indicando que el RUT es correcto
        rut.setCustomValidity('');
        return true;
        
    }
}

function format(rut) {
    rut = clean(rut);
    if (rut.length > 0) {
        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
        for (var i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result;
        }
        return result;
    } else {
        return rut; // Si el campo está vacío, devuelve el valor vacío sin agregar el guion
    }
}


function clean (rut) {
    return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : ''
}




/*_____________________JQUERY______________________*/
/*
    // Función para validar un RUT
    function checkRut(rut) {
        // Verificar si el campo RUT está vacío o tiene menos de dos caracteres
        if (rut.value.length <= 0 ) {
            // Si es así, mostrar un mensaje indicando que se debe ingresar un RUT válido
            
        }

        // Limpiar el valor del RUT ingresado (quitar puntos y guiones)
        let valor = clean(rut.value);

        // Separar el cuerpo del RUT y el dígito verificador
        let bodyRut = valor.slice(0, -1);
        let dv = valor.slice(-1).toUpperCase();

        // Formatear visualmente el RUT (agregar puntos y guión)
        rut.value = format(rut.value);

        // Verificar si el cuerpo del RUT tiene menos de 7 caracteres
        if (bodyRut.length <= 7) {
            // Si es así, mostrar un mensaje indicando que el RUT es demasiado corto
            
        }

        // Calcular el dígito verificador utilizando el método del Módulo 11
        suma = 0;
        multiplo = 2;

        // Iterar sobre cada dígito del cuerpo del RUT
        for (i = 1; i <= bodyRut.length; i++) {
            // Obtener el producto del dígito por el multiplo correspondiente
            index = multiplo * valor.charAt(bodyRut.length - i);
            // Sumar al contador general
            suma = suma + index;

            // Consolidar el multiplo dentro del rango [2, 7]
            if (multiplo < 7) {
                multiplo = multiplo + 1;
            } else {
                multiplo = 2;
            }
        }

        // Calcular el dígito verificador esperado según el Módulo 11
        dvEsperado = 11 - (suma % 11);

        // Manejar casos especiales (0 y K)
        dv = dv == "K" ? 10 : dv;
        dv = dv == 0 ? 11 : dv;

        // Verificar si el dígito verificador esperado no coincide con el ingresado
        if (dvEsperado != dv) {
            // Si no coincide, mostrar un mensaje indicando que el RUT es incorrecto
            rut.setCustomValidity("RUT Inválido");
            //mensaje.innerHTML = 'El RUT ingresado: ' + rut.value + ' Es <strong>INCORRECTO</strong>.';
            return false;
        } else {
            // Si coincide, mostrar un mensaje indicando que el RUT es correcto
            rut.setCustomValidity('');
            return true;
        }
    }

    // Función para formatear el RUT
    function format (rut) {
        rut = clean(rut)
        var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1)
        for (var i = 4; i < rut.length; i += 3) {
            result = rut.slice(-3 - i, -i) + '.' + result
        }

        return result; // ej : 12.312.312-3 si ingresas este aparece valido pero mira si le quitas uno
    }

    // Función para limpiar el RUT
    function clean (rut) {
        return typeof rut === 'string'
        ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
        : ''
    }

    // Evento keypress para el campo de RUT
    $('#rut').keypress(function(evt) {
        return isNumber(evt);
    });

    // Evento input para el campo de RUT
    $('#rut').on('input', function() {
        checkRut(this);
    });
    */
// Permitir solo números y letra k en input rut
function isNumber(evt){
    let charCode = evt.which;

    // Permitir números (códigos de tecla entre 48 y 57) y la letra 'K' (código de tecla 75)
    if ((charCode >= 48 && charCode <= 57) || charCode === 75) {
        return true;
    } else {
        return false;
    }
}
// Función para validar el campo de paterno
function validatePaterno(paterno) {
    var paternoLength = paterno.value.length;
    if (paternoLength < 3 || paternoLength > 20) {
        // Si el nombre es demasiado corto o demasiado largo, mostrar un mensaje de error
        paterno.setCustomValidity("El apellido paterno debe tener entre 3 y 20 caracteres.");
        return false;
    } else {
        // Si el nombre cumple con los requisitos, eliminar cualquier mensaje de error
        paterno.setCustomValidity('');
        return true;
    }
}
// Función para validar el campo de materno
function validateMaterno(materno) {
    var maternoLength = materno.value.length;
    if (maternoLength < 3 || maternoLength > 20) {
        // Si el nombre es demasiado corto o demasiado largo, mostrar un mensaje de error
        materno.setCustomValidity("El apellido materno debe tener entre 3 y 20 caracteres.");
        return false;
    } else {
        // Si el nombre cumple con los requisitos, eliminar cualquier mensaje de error
        materno.setCustomValidity('');
        return true;
    }
}
// Función para validar el campo de nombre
function validateName(nombre) {
    var nameLength = nombre.value.length;
    if (nameLength < 3 || nameLength > 20) {
        // Si el nombre es demasiado corto o demasiado largo, mostrar un mensaje de error
        nombre.setCustomValidity("El nombre debe tener entre 3 y 20 caracteres.");
        return false;
    } else {
        // Si el nombre cumple con los requisitos, eliminar cualquier mensaje de error
        nombre.setCustomValidity('');
        return true;
    }
}
// Función para calcular la edad a partir de una fecha de nacimiento
function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var edad = (hoy.getFullYear() - fechaNacimiento.getFullYear());
    var mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    return edad;
}
// Función para validar un correo electrónico con el dominio "@gmail.com" utilizando una expresión regular
function validarEmail(email) {
    // Expresión regular para validar el formato de correo electrónico con el dominio "@gmail.com"
    var emailRegex = /^[^\s@]+@gmail\.com$/;

    // Verificar si el correo electrónico tiene un formato válido
    return emailRegex.test(email);
}
// Función para validar la entrada de edad
function validarEdad(entrada) {
    // Verificar si la entrada contiene solo caracteres ASCII numéricos y está dentro del rango permitido
    return /^\d+$/.test(entrada) && parseInt(entrada) >= 18 && parseInt(entrada) <= 35;
}

// Función para validar la entrada de número de celular
function validarCelular(entrada) {
    // Verificar si la entrada contiene solo caracteres ASCII numéricos y tiene una longitud de 11 caracteres
    return /^(\+?56)?-?9\d{8}$/.test(entrada);
}
// Convertir funciones a jQuery
$(document).ready(function(){
    
    

    // Evento input para el campo de paterno
    $('#paterno').on('input', function() {
        validatePaterno(this);
    });

    

    // Evento input para el campo de materno
    $('#materno').on('input', function() {
        validateMaterno(this);
    });

    

    // Evento input para el campo de nombre
    $('#nombre').on('input', function() {
        validateName(this);
    });

    

    $('#fecha').on('input', function() {
        // Obtener la fecha de nacimiento del campo y convertirla a un objeto Date
        var fechaNacimiento = new Date($(this).val());
        
        // Calcular la edad actual en años
        var edad = calcularEdad(fechaNacimiento);
        
        // Verificar si la edad está entre 18 y 35 años
        if (edad < 18 || edad > 35) {
            // Si la edad está fuera del rango, establecer un mensaje de error
            $(this)[0].setCustomValidity("Debe tener entre 18 y 35 años.");
        } else {
            // Si la edad está dentro del rango, borrar el mensaje de error
            $(this)[0].setCustomValidity("");
        }
    });

    $('#email').on('input', function() {
        // Obtener el valor del campo de correo electrónico
        var email = $(this).val();
            
        // Verificar si el correo electrónico tiene un formato válido
        if (!validarEmail(email)) {
            // Si el formato es inválido, establecer un mensaje de error
            $(this)[0].setCustomValidity("Ingrese un correo electrónico válido con el dominio '@gmail.com'.");
        } else {
            // Si el formato es válido, borrar el mensaje de error
            $(this)[0].setCustomValidity("");
        }
    });

    // Agregar un evento de escucha para el evento keypress (cuando se presiona una tecla)
    $('#edad').on('keypress', function(event) {
        // Obtener el código ASCII de la tecla presionada
        var charCode = event.which ? event.which : event.keyCode;
        
        // Verificar si la tecla presionada es un número o la tecla de retroceso (backspace)
        if (charCode < 48 || charCode > 57) {
            // Si la tecla no es un número o la tecla de retroceso, cancelar el evento para evitar que se agregue al campo
            event.preventDefault();
        }
    });

    // Agregar un evento de escucha para el evento keypress (cuando se presiona una tecla)
    $('#celular').on('keypress', function(event) {
        // Obtener el código ASCII de la tecla presionada
        var charCode = event.which ? event.which : event.keyCode;
        
        // Verificar si la tecla presionada es un número o la tecla de retroceso (backspace)
        if (charCode < 48 || charCode > 57) {
            // Si la tecla no es un número o la tecla de retroceso, cancelar el evento para evitar que se agregue al campo
            event.preventDefault();
        }
    });

    // Agregar un evento de escucha para el evento input (cuando se modifica el valor del campo)
    $('#edad').on('input', function() {
        // Obtener el valor del campo de edad
        var entrada = $(this).val();
        
        // Verificar si la entrada de edad es válida
        if (!validarEdad(entrada)) {
            // Si la entrada es inválida, establecer un mensaje de error
            $(this)[0].setCustomValidity("La edad debe ser un número entre 18 y 35.");
        } else {
            // Si la entrada es válida, borrar el mensaje de error
            $(this)[0].setCustomValidity("");
        }
    });

    // Agregar un evento de escucha para el evento input (cuando se modifica el valor del campo)
    $('#celular').on('input', function() {
        // Obtener el valor del campo de número de celular
        var entrada = $(this).val();
        
        // Verificar si la entrada de celular es válida
        if (!validarCelular(entrada)) {
            // Si la entrada es inválida, establecer un mensaje de error
            $(this)[0].setCustomValidity("El número de celular debe contener 11 dígitos.");
        } else {
            // Si la entrada es válida, borrar el mensaje de error
            $(this)[0].setCustomValidity("");
        }
    });
});



