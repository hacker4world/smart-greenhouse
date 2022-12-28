import API_ENDPOINT from "../../data/api-endpoint.js";

const jumbotron = document.querySelector(".jumbotron");

const greenHouseInfo = document.getElementById("greenhouse-info");
const otherUsersInfo = document.getElementById("other-users");

jumbotron.style.display = "none";
otherUsersInfo.style.display = "none";

const urlString = window.location.href;

const greenHouseId = new URL(urlString).searchParams.get("greenhouse-id");

const signedUser = JSON.parse(localStorage.getItem("signed-user"));

const logoutButton = document.getElementById("logout-button");

if (!signedUser) {
  window.location = "../authentication/login.html";
}

fetch(API_ENDPOINT + `/${greenHouseId}/sensors`)
  .then((res) =>
    res.json().then((sensors) => {
      const temperature = sensors.find(
        (s) => s.type === "TemperatureSensor"
      ).values;
      const humidity = sensors.find((s) => s.type === "HumiditySensor").values;
      const pressure = sensors.find((s) => s.type === "PressureSensor").values;
      jumbotron.style.display = "block";
      otherUsersInfo.style.display = "block";
      greenHouseInfo.innerHTML = `<div class="card info-card">
              <div class="card-body" >
                <i class="bi bi-thermometer-half"></i>
                <label>Temperature: ${
                  temperature[temperature.length - 1]
                }°C</label>
              </div>
            </div>
            <div class="card info-card">
              <div class="card-body">
                <i class="bi bi-droplet-fill"></i>
                <label>Humidity: ${humidity[humidity.length - 1]}</label>
              </div>
            </div>
            <div class="card info-card">
              <div class="card-body">
                <i class="bi bi-compass-fill"></i>
                <label>Pressure: ${pressure[pressure.length - 1]}</label>
              </div>
            </div>`;
    })
  )
  .catch((err) => {
    greenHouseInfo.innerHTML = "<h3>Error getting greenhouse informations</h3>";
  });

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("signed-user");
  window.location = "../authentication/login.html";
});
