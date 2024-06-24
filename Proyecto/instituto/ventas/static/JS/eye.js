// Función para alternar la visibilidad de la contraseña
function validationEye() {
    var x = document.getElementById("confirm-password");
    var y = document.getElementById("hide1");
    var z = document.getElementById("hide2");
    if (x.type === "password") {
        x.type = "text";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.type = "password";
        y.style.display = "none";
        z.style.display = "block";
    }
}

// Función para validar que las contraseñas coincidan
function validateConfirmPassword() {
    var password = $('#password').val();
    var confirmPassword = $('#confirm-password').val();
    if (password !== confirmPassword) {
        $('#confirm-password-error').text('Las contraseñas no coinciden.');
        return false;
    } else {
        $('#confirm-password-error').text('');
        return true;
    }
}

// Función para validar un correo electrónico con el dominio "@gmail.com"
function validarEmail(email) {
    var emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
}

$(document).ready(function() {
    // Evento input para validar el campo de username
    $('#username').on('input', function() {
        var currentValue = $(this).val().trim();
        if (currentValue.length < 3 || currentValue.length > 20) {
            $(this)[0].setCustomValidity("El username debe tener entre 3 y 20 caracteres.");
        } else if (!/^[a-zA-Z]+$/.test(currentValue)) {
            $(this)[0].setCustomValidity("Solo se permiten letras para el username.");
        } else {
            $(this)[0].setCustomValidity("");
        }
    });

    // Evento keypress para permitir solo letras en el campo de username
    $('#username').on('keypress', function(event) {
        var charCode = event.which ? event.which : event.keyCode;
        // Permitir solo letras (ASCII: a-z, A-Z)
        if (!(charCode >= 65 && charCode <= 90) && // letras mayúsculas
            !(charCode >= 97 && charCode <= 122) && // letras minúsculas
            !(charCode == 0 || charCode == 8)) { // teclas de navegación y retroceso
            event.preventDefault();
        }
    });

    // Evento input para el campo de correo electrónico
    $('#email').on('input', function() {
        var email = $(this).val();
        if (!validarEmail(email)) {
            $(this)[0].setCustomValidity("Ingrese un correo electrónico válido con el dominio '@gmail.com'.");
        } else {
            $(this)[0].setCustomValidity("");
        }
    });

    // Evento input para el campo de contraseña
    $('#password').on('input', function() {
        var currentValue = $(this).val();
        if (currentValue.length < 6 || currentValue.length > 20) {
            $(this)[0].setCustomValidity("La contraseña debe contener entre 6 y 20 caracteres.");
        } else {
            $(this)[0].setCustomValidity("");
        }
    });
});
