const showPasswordCheckbox = document.getElementById("show-password");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
const emailInput = document.getElementById("email-input");
const alertBox = document.getElementById("alert");

/* importing fake users */
import users from "../../data/users.js";

console.log(users);

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

  const userAccount = users.find((user) => user.email === emailInput.value);

  if (!userAccount || userAccount.password !== passwordInput.value) {
    alertBox.style.display = "block";
    alertBox.innerText = "Did not find any account with the given credentials";
    return;
  }
  alertBox.style.display = "none";
  alertBox.innerText = "";
  localStorage.setItem(
    "signed-user",
    JSON.stringify({
      id: userAccount.id,
      username: userAccount.username,
    })
  );
  window.location = "../../index.html";
});

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
