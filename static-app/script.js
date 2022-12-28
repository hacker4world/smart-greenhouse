import greenHouses from "./data/greenhouses.js";

const loggedInUser = localStorage.getItem("signed-user");
const logoutButton = document.getElementById("logout-button");
const greenHouseList = document.getElementById("greenhouse-list");

if (!loggedInUser) {
  window.location = "./pages/authentication/login.html";
  logoutButton.style.display = "none";
} else {
  console.log(greenHouses);
  const userId = JSON.parse(localStorage.getItem("signed-user")).id;
  let greenHousesListHTML = "";
  greenHouses
    .filter((g) => g.users.includes(userId))
    .forEach((g) => {
      greenHousesListHTML += `<div class="card greenhouse-card" style="width: 18rem;">
      <img src="./assets/greenhouse.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${g.topic}</h5>
    <a href="./pages/greenhouse-details/details.html?greenhouse-id=${g.id}"><button class="btn btn-success">View informations</button></a>
  </div>
</div>`;
    });
  if (greenHousesListHTML === "") {
    greenHousesListHTML =
      "<h3>You don't have access to any greenhouse yet</h3>";
  }
  greenHouseList.innerHTML = greenHousesListHTML;
}

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("signed-user");
  window.location = "./pages/authentication/login.html";
});
