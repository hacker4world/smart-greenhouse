const emailInput = document.getElementById("email-input");
const sendEmailButton = document.getElementById("send-email");
const alertBox = document.getElementById("alert");

sendEmailButton.addEventListener("click", function (event) {
  event.preventDefault();
  if (!isValidEmail(emailInput.value)) {
    alertBox.style.display = "block";
    alertBox.innerText = "Invalid email address";
    return;
  }
  /* recover account request */
});

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}
