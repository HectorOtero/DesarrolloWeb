const d = document;
const $form = d.querySelector("#register-form");
const $nameInput = d.querySelector("#name");
const $nameError = d.querySelector("#name-error");
const $emailInput = d.querySelector("#email");
const $emailError = d.querySelector("#email-error");
const $passwordInput = d.querySelector("#password");
const $passwordError = d.querySelector("#password-error");
const $confirmPasswordInput = d.querySelector("#confirm-password");
const $confirmPasswordError = d.querySelector("#confirm-password-error");
const $successMessage = d.querySelector("#success-message");
const $errorsMessages = d.querySelectorAll(".error");
const $loader = d.querySelector("#loader");

// Función de Validación del Formulario
function validateForm(e) {
  // Reiniciar mensajes de error y éxito
  $errorsMessages.forEach((el) => {
    el.innerText = "";
  });
  $successMessage.innerText = "";

  let isValid = true;

  //Validar Nombre
  const namePattern = /^[A-Za-zÀ-ÿ\s]+$/;
  if ($nameInput.value.trim() === "") {
    $nameError.innerText = "El nombre es obligatorio";
    isValid = false;
  }
  else if 
    (!namePattern.test($nameInput.value.trim())) {
        $nameError.innerText = "El nombre solo puede contener letras y espacios";
        isValid = false;
    }

  //Validar Email
  let emailPattern = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  if ($emailInput.value.trim() === "") {
    $emailError.innerText = "El email es obligatorio";
    isValid = false;
  } else if (!emailPattern.test($emailInput.value.trim())) {
    $emailError.innerText = "El formato del correo no es válido";
    isValid = false;
  }

  //Validar Password
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if ($passwordInput.value.trim() === "") {
    $passwordError.innerText = "La contraseña es obligatorio";
    isValid = false;
  } else if ($passwordInput.value.trim().length < 8) {
    $passwordError.innerText = "La contraseña debe tener al menos 8 caracteres";
    isValid = false;
  }
  else if (!passwordPattern.test($passwordInput.value.trim())){
    $passwordError.innerText = "La contraseña debe llevar una mayuscula, una minuscula, un numero y un caracter especial por lo menos";
    isValid = false;
  }

  //Validar Confirmar Password
  if ($confirmPasswordInput.value.trim() !== $passwordInput.value.trim()) {
    $confirmPasswordError.innerText = "Las contraseñas no coinciden";
    isValid = false;
  }

  if (!isValid) {
    //Prevenir el envío del formulario si hay errores
    e.preventDefault();
  } else {
    e.preventDefault();
    ShowLoader();
    setTimeout(()=> {
        hideLoader();
        $successMessage.innerText = "Formulario enviado exitosamente.";
        $form.reset();

    }, 5000);
    
    // Aquí puedes manejar el envío real de datos a un servidor, por ejemplo, usando fetch.
  }

  function ShowLoader(){
    $loader.style.display = "block";
  }

  function hideLoader() {
    $loader.style.display = "none"; 
  }
}

$form.addEventListener("submit", validateForm);