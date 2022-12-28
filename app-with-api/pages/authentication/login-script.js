import API_ENDPOINT from "../../data/api-endpoint.js";

const showPasswordCheckbox = document.getElementById("show-password");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("email-input");
const alertBox = document.getElementById("alert");

showPasswordCheckbox.addEventListener("change", function (event) {
  if (event.target.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (!isValidEmail(emailInput.value)) {
    alertBox.style.display = "block";
    alertBox.innerText = "Invalid email address";
    return;
  }
  if (passwordInput.value.trim() === "") {
    alertBox.style.display = "block";
    alertBox.innerText = "Did not find any account with the given credentials";
  }
  alertBox.style.display = "none";
  alertBox.innerText = "";

  /* login request */
});

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
