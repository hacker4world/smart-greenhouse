import API_ENDPOINT from "../../data/api-endpoint.js";

const showPasswordCheck = document.getElementById("show-password");
const signupButton = document.getElementById("signup-button");

const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const phoneInput = document.getElementById("phone-input");

const alertBox = document.getElementById("alert");

showPasswordCheck.addEventListener("change", function (event) {
  if (event.target.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

signupButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (usernameInput.value.trim() === "") {
    alertBox.style.display = "block";
    alertBox.innerText = "username is required";
    return;
  }
  if (emailInput.value.trim() === "" || !isValidEmail(emailInput.value)) {
    alertBox.style.display = "block";
    alertBox.innerText = "invalid email";
    return;
  }

  if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
    alertBox.style.display = "block";
    alertBox.innerText = "password must be atleast 8 characters long";
    return;
  }

  if (
    ![2, 5, 9].includes(Number(phoneInput.value[0])) ||
    phoneInput.value.length !== 8
  ) {
    alertBox.style.display = "block";
    alertBox.innerText = "Phone number is not valid";
    return;
  }

  fetch(API_ENDPOINT + "/signup", {
    method: "POST",
    body: JSON.stringify({
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      telephone: phoneInput.value,
      roles: ["USER"],
    }),
  })
    .then((res) =>
      res.json().then((data) => {
        const { username, Id } = data;
        localStorage.setItem(
          "signed-user",
          JSON.stringify({
            Id,
            username,
          })
        );
        window.location = "../../index.html";
      })
    )
    .catch((err) => {
      alertBox.style.display = "block";
      alertBox.innerText = "Error signing up";
      return;
    });
});

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
