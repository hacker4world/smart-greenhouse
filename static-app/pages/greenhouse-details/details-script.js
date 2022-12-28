import greenHouses from "../../data/greenhouses.js";
import users from "../../data/users.js";

const jumbotron = document.querySelector(".jumbotron");

const greenHouseInfo = document.getElementById("greenhouse-info");
const otherUsersInfo = document.getElementById("other-users");

jumbotron.style.display = "none";
otherUsersInfo.style.display = "none";

const urlString = window.location.href;

const greenHouseId = new URL(urlString).searchParams.get("greenhouse-id");

const greenHouse = greenHouses.find((g) => g.id === Number(greenHouseId));

const signedUser = JSON.parse(localStorage.getItem("signed-user"));

const logoutButton = document.getElementById("logout-button");

if (!signedUser) {
  window.location = "../authentication/login.html";
}

if (!greenHouse) {
  greenHouseInfo.innerHTML =
    "<h3 style='text-align: center;' >Greenhouse does not exist</h3>";
} else if (!greenHouse.users.includes(signedUser.id)) {
  greenHouseInfo.innerHTML =
    "<h3 style='text-align: center;' >You don't have access to this Greenhouse</h3>";
} else {
  jumbotron.style.display = "block";
  otherUsersInfo.style.display = "block";
  document.getElementById("greenhouse-name").innerText = greenHouse.topic;
  greenHouseInfo.innerHTML = `<div class="card info-card">
  <div class="card-body" >
    <i class="bi bi-thermometer-half"></i>
    <label>Temperature: ${greenHouse.temperature}°C</label>
  </div>
</div>
<div class="card info-card">
  <div class="card-body">
    <i class="bi bi-droplet-fill"></i>
    <label>Humidity: ${greenHouse.humidity}</label>
  </div>
</div>
<div class="card info-card">
  <div class="card-body">
    <i class="bi bi-compass-fill"></i>
    <label>Pressure: ${greenHouse.pression}</label>
  </div>
</div>`;

  let otherUsers =
    "<h3 style='text-align: center'>Users having access to this Greenhouse</h3><br><div class='users-list'>";
  greenHouse.users
    .filter((u) => u !== signedUser.id)
    .forEach((user) => {
      const userData = users.find((u) => u.id === user);
      otherUsers += `<div class="card info-card">
  <div class="card-body">
    <img style="width: 45px; height: 45px; border-radius: 50%" src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" >
    <label style="margin-left: 8px">${userData.username.split(" ")[0]}</label>
  </div>
</div>`;
      otherUsers += "</div>";
      otherUsersInfo.innerHTML = otherUsers;
    });
}

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("signed-user");
  window.location = "../authentication/login.html";
});
