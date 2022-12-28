import API_ENDPOINT from "./data/api-endpoint.js";

const loggedInUser = localStorage.getItem("signed-user");
const logoutButton = document.getElementById("logout-button");
const greenHouseList = document.getElementById("greenhouse-list");

if (!loggedInUser) {
  window.location = "./pages/authentication/login.html";
  logoutButton.style.display = "none";
} else {
  let greenHousesListHTML = "";
  const username = JSON.parse(localStorage.getItem("signed-user")).username;
  fetch(API_ENDPOINT + `${username}/greenhouse`)
    .then((res) =>
      res.json().then((greenhouses) => {
        greenhouses.forEach((greenhouse) => {
          greenHousesListHTML += `<div class="card greenhouse-card" style="width: 18rem;">
      <img src="./assets/greenhouse.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${greenhouse.username}</h5>
    <a href="./pages/greenhouse-details/details.html?greenhouse-id=${greenhouse.Id}"><button class="btn btn-success">View informations</button></a>
  </div>
</div>`;
        });
        if (greenHousesListHTML === "") {
          greenHousesListHTML =
            "<h3>You don't have access to any greenhouse yet</h3>";
        }
        greenHouseList.innerHTML = greenHousesListHTML;
      })
    )
    .catch((err) => {
      greenHousesListHTML = "<h3>Error displaying greenhouses</h3>";
      greenHouseList.innerHTML = greenHousesListHTML;
    });
}

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("signed-user");
  window.location = "./pages/authentication/login.html";
});
