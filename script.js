// Agrega un evento de clic al botón de menú para mostrar/ocultar el menú de navegación
document.querySelector(".menu-btn").addEventListener("click", () => {
  // Alterna la clase "show" en el menú de navegación al hacer clic
  document.querySelector(".nav-menu").classList.toggle("show");
});

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  // Obtén referencias a los elementos del formulario y botón de enviar
  const form = document.getElementById("registerForm");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const cedula = document.getElementById("cedula");
  const direccion = document.getElementById("direccion");
  const telefono = document.getElementById("telefono");
  const submitButton = document.querySelector(".boton");

  // Reglas de validación para cada campo del formulario
  const validationRules = {
    nombre: {
      pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,}$/,
      message: "El nombre debe contener solo letras y al menos 3 caracteres",
    },
    apellido: {
      pattern: /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]{3,}$/,
      message: "El apellido debe contener solo letras y al menos 3 caracteres",
    },
    email: {
      pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9]*(?:[._-][a-zA-Z0-9]{1,})?)@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{1,})?$/,
      message: "Introduce un correo electrónico válido",
    },
    cedula: {
      pattern: /^\d{10}$/,
      message: "La cédula debe contener 10 dígitos numéricos.",
    },
    direccion: {
      pattern: /^[a-zA-Z0-9\s,.'-]{3,}$/,
      message: "Introduce una dirección válida",
    },
    telefono: {
      pattern: /^\d{10}$/,
      message: "El teléfono debe tener 10 dígitos numéricos.",
    },
  };

  // Función para validar un campo específico
  const validateField = (field, rules) => {
    // Encuentra el elemento span de error correspondiente al campo
    const errorSpan = document.getElementById(`error${capitalizeFirstLetter(field.id)}`);
    // Verifica si el valor del campo cumple con el patrón de validación
    if (!rules.pattern.test(field.value)) {
      errorSpan.textContent = rules.message; // Muestra el mensaje de error si la validación falla
      return false; // Retorna falso si la validación falla
    } else {
      errorSpan.textContent = ""; // Borra el mensaje de error si la validación es exitosa
      return true; // Retorna verdadero si la validación es exitosa
    }
  };

  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Función para verificar la validez del formulario completo
  const checkFormValidity = () => {
    return (
      validateField(nombre, validationRules.nombre) &&
      validateField(apellido, validationRules.apellido) &&
      validateField(email, validationRules.email) &&
      validateField(cedula, validationRules.cedula) &&
      validateField(direccion, validationRules.direccion) &&
      validateField(telefono, validationRules.telefono)
    );
  };

  // Función para verificar si el correo electrónico ya está registrado
  const isEmailRepeated = (email) => {
    // Obtiene la lista de usuarios desde localStorage o una lista vacía si no hay usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Retorna verdadero si algún usuario tiene el mismo correo electrónico
    return usuarios.some(usuario => usuario.email === email);
  };

  // Función para verificar si la cédula ya está registrada
  const isCedulaRepeated = (cedula) => {
    // Obtiene la lista de usuarios desde localStorage o una lista vacía si no hay usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Retorna verdadero si algún usuario tiene la misma cédula
    return usuarios.some(usuario => usuario.cedula === cedula);
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    let formIsValid = true; // Variable para verificar la validez del formulario

    // Itera sobre cada campo del formulario para validarlos
    [nombre, apellido, email, cedula, direccion, telefono].forEach((field) => {
      const isValidField = validateField(field, validationRules[field.id]); // Valida el campo actual
      if (!isValidField) {
        formIsValid = false; // Marca el formulario como inválido si algún campo no es válido
      }
    });

    submitButton.style.backgroundColor = formIsValid ? "green" : "red"; // Cambia el color del botón según la validez del formulario

    // Si el formulario es válido, procede con el registro
    if (formIsValid) {
      // Verifica si el correo electrónico ya está registrado
      if (isEmailRepeated(email.value)) {
        Swal.fire("Error", "El correo electrónico ya está registrado", "error"); // Muestra un mensaje de error
        return; // Detiene el proceso de registro
      }

      // Verifica si la cédula ya está registrada
      if (isCedulaRepeated(cedula.value)) {
        Swal.fire("Error", "La cédula ya está registrada", "error"); // Muestra un mensaje de error
        return; // Detiene el proceso de registro
      }

      // Objeto con los datos del formulario
      const formData = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        cedula: cedula.value,
        direccion: direccion.value,
        telefono: telefono.value,
      };

      // Obtiene la lista de usuarios desde localStorage o una lista vacía si no hay usuarios
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      // Agrega el nuevo usuario a la lista
      usuarios.push(formData);
      // Guarda la lista actualizada de usuarios en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      // Muestra un mensaje de éxito al usuario
      Swal.fire("Registro exitoso", "El usuario ha sido registrado con éxito", "success");
      form.reset(); // Reinicia el formulario
      submitButton.style.backgroundColor = "red"; // Restaura el color original del botón
    } else {
      Swal.fire("Error", "Por favor, corrige los errores en el formulario", "error"); // Muestra un mensaje de error al usuario
    }
  };

  // Agrega el evento submit al formulario para manejar su envío
  form.addEventListener("submit", handleSubmit);
});
