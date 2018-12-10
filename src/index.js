import "./style.sass";

//timer
function timer() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let mins = currentTime.getMinutes();
  let secs = currentTime.getSeconds();

  document.getElementById("dig1").innerHTML = (hours - (hours % 10)) / 10;
  document.getElementById("dig2").innerHTML = hours % 10;
  document.getElementById("dig3").innerHTML = (mins - (mins % 10)) / 10;
  document.getElementById("dig4").innerHTML = mins % 10;
  document.getElementById("dig5").innerHTML = (secs - (secs % 10)) / 10;
  document.getElementById("dig6").innerHTML = secs % 10;
  setTimeout(timer, 1000);
}

//geolocation API
function findLocation(cb) {
  let coords = {
    lat: 0,
    lon: 0
  };
  if (navigator.geolocation) {
    //check if geolocation is available
    navigator.geolocation.getCurrentPosition(function (position) {
      coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      cb(coords);
    });
  } else {
    console.log("geolocation is not supported");
    cb(coords);
  }
}

//weather API
function getDataByCity() {
  let cityName = document.getElementById("inputCity").value;

  console.log(cityName);
  fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=3204627b3e52bb95c80ab6eef554e476`
    )
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return Promise.reject(resp);
      }
    })
    .then(resp => {
      console.log(resp);
      displayWeather(resp);
    })
    .catch(error => {
      if (error.status === 404) {
        console.log("Błąd: żądany adres nie istnieje");
      }
    });
}

function getDataByCoords(currentPosition) {
  // console.log(currentPosition);
  fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${
      currentPosition.lat
    }&lon=${
      currentPosition.lon
    }&units=metric&appid=3204627b3e52bb95c80ab6eef554e476`
    )
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        return Promise.reject(resp);
      }
    })
    .then(resp => {
      console.log(resp);
      displayWeather(resp);
    })
    .catch(error => {
      if (error.status === 404) {
        console.log("Błąd: żądany adres nie istnieje");
      }
    });
}

function displayWeather(resp) {
  console.log(document.getElementById("cityName").innerText);
  document.getElementById("cityName").innerText =
    resp.city.name + ", " + resp.city.country;
  document.getElementById("tempValue").innerText = resp.list[0].main.temp;
  document.getElementById("pressValue").innerText = resp.list[0].main.pressure;
  document.getElementById("weatherValue").innerText =
    resp.list[0].weather[0].description;

  let arrOftwelve = [];
  resp.list.map(element => {
    if (element.dt_txt.includes("12:00")) {
      arrOftwelve.push(element);
    }
  });
  let arrOfmidnight = [];
  resp.list.map(element => {
    if (element.dt_txt.includes("00:00:00")) {
      arrOfmidnight.push(element);
    }
  });
  console.log(arrOfmidnight);
  console.log(arrOftwelve);

  if (resp.list.indexOf(arrOftwelve[0]) > resp.list.indexOf(arrOfmidnight[0])) {
    for (let i = 0; i < arrOfmidnight.length; i++) {
      document.getElementById(`item${i * 2 + 1}`).style.display = "block";
      document
        .getElementById(`item${i * 2 + 1}`)
        .children[0].classList.add("darkStripe");
      document
        .getElementById(`item${i * 2 + 1}`)
        .children[1].classList.add("darkIcon");
      document.getElementById(`item${i * 2 + 1}`).classList.add("darkBorder");
      document.getElementById(`item${i * 2 + 1}`).children[1].innerHTML = setIcon(arrOfmidnight[i].weather[0].id);
      document.getElementById(`item${i * 2 + 1}`).children[2].innerHTML =
        arrOfmidnight[i].dt_txt;
      document.getElementById(`item${i * 2 + 1}`).children[3].innerHTML =
        "Temperature: " + arrOfmidnight[i].main.temp.toFixed() + "&deg;C";
      document.getElementById(`item${i * 2 + 1}`).children[4].innerHTML =
        "Pressure: " + arrOfmidnight[i].main.pressure.toFixed() + " hPa";
      document.getElementById(`item${i * 2 + 1}`).children[5].innerHTML =
        "Humidity: " + arrOfmidnight[i].main.humidity + "%";
      document.getElementById(`item${i * 2 + 1}`).children[6].innerHTML =
        "Weather: " + arrOfmidnight[i].weather[0].description;
    }
    for (let j = 0; j < arrOftwelve.length; j++) {
      document.getElementById(`item${(j + 1) * 2}`).style.display = "block";
      document.getElementById(`item${(j + 1) * 2}`).children[1].innerHTML = setIcon(arrOftwelve[j].weather[0].id);
      document.getElementById(`item${(j + 1) * 2}`).children[2].innerHTML =
        arrOftwelve[j].dt_txt;
      document.getElementById(`item${(j + 1) * 2}`).children[3].innerHTML =
        "Temperature: " + arrOftwelve[j].main.temp.toFixed() + "&deg;C";
      document.getElementById(`item${(j + 1) * 2}`).children[4].innerHTML =
        "Pressure:  " + arrOftwelve[j].main.pressure.toFixed() + " hPa";

      document.getElementById(`item${(j + 1) * 2}`).children[5].innerHTML =
        "Humidity: " + arrOftwelve[j].main.humidity + "%";
      document.getElementById(`item${(j + 1) * 2}`).children[6].innerHTML =
        "Weather: " + arrOftwelve[j].weather[0].description;
    }
  } else {
    for (let i = 0; i < arrOfmidnight.length; i++) {
      document.getElementById(`item${(i + 1) * 2}`).style.display = "block";
      document
        .getElementById(`item${(i + 1) * 2}`)
        .children[0].classList.add("darkStripe");
      document.getElementById(`item${(i + 1) * 2}`)
        .children[1].classList.add("darkIcon");
      document.getElementById(`item${(i + 1) * 2}`).classList.add("darkBorder");
      document.getElementById(`item${(i + 1) * 2}`).children[1].innerHTML = setIcon(arrOfmidnight[i].weather[0].id);
      document.getElementById(`item${(i + 1) * 2}`).children[2].innerHTML =
        arrOfmidnight[i].dt_txt;
      document.getElementById(`item${(i + 1) * 2}`).children[3].innerHTML =
        "Temperature: " + arrOfmidnight[i].main.temp.toFixed() + "&deg;C";
      document.getElementById(`item${(i + 1) * 2}`).children[4].innerHTML =
        "Pressure: " + arrOfmidnight[i].main.pressure.toFixed() + " hPa";
      document.getElementById(`item${(i + 1) * 2}`).children[5].innerHTML =
        "Humidity: " + arrOfmidnight[i].main.humidity + "%";
      document.getElementById(`item${(i + 1) * 2}`).children[6].innerHTML =
        "Weather: " + arrOfmidnight[i].weather[0].description;
    }
    for (let j = 0; j < arrOftwelve.length; j++) {
      document.getElementById(`item${j * 2 + 1}`).style.display = "block";
      document.getElementById(`item${j * 2 + 1}`).children[1].innerHTML = setIcon(arrOftwelve[j].weather[0].id);
      document.getElementById(`item${j * 2 + 1}`).children[2].innerHTML =
        arrOftwelve[j].dt_txt;
      document.getElementById(`item${j * 2 + 1}`).children[3].innerHTML =
        "Temperature: " + arrOftwelve[j].main.temp.toFixed() + "&deg;C";
      document.getElementById(`item${j * 2 + 1}`).children[4].innerHTML =
        "Pressure:  " + arrOftwelve[j].main.pressure.toFixed() + " hPa";
      document.getElementById(`item${j * 2 + 1}`).children[5].innerHTML =
        "Humidity: " + arrOftwelve[j].main.temp + "%";
      document.getElementById(`item${j * 2 + 1}`).children[6].innerHTML =
        "Weather: " + arrOftwelve[j].weather[0].description;
    }
  }
}

function setIcon(code) {

  switch (code) {
    case 800:
      return '<i class="far fa-sun"></i>';
    case 801:
      return '<i class="fas fa-cloud-sun"></i>';
    case 802:
      return '<i class="fas fa-cloud-sun"></i>';
    case 803:
      return '<i class="fas fa-cloud-sun"></i>';
    case 804:
      return '<i class="fas fa-cloud-sun"></i>';
    case 701:
      return '<i class="fas fa-wind"></i>';
    case 711:
      return '<i class="fas fa-wind"></i>';
    case 721:
      return '<i class="fas fa-wind"></i>';
    case 731:
      return '<i class="fas fa-wind"></i>';
    case 741:
      return '<i class="fas fa-wind"></i>';
    case 751:
      return '<i class="fas fa-wind"></i>';
    case 761:
      return '<i class="fas fa-wind"></i>';
    case 762:
      return '<i class="fas fa-wind"></i>';
    case 771:
      return '<i class="fas fa-wind"></i>';
    case 781:
      return '<i class="fas fa-wind"></i>';
    case 600:
      return '<i class="far fa-snowflake"></i>';
    case 601:
      return '<i class="far fa-snowflake"></i>';
    case 602:
      return '<i class="far fa-snowflake"></i>';
    case 611:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 612:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 615:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 616:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 620:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 621:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 622:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 500:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 501:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 502:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 503:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 504:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 511:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 520:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 521:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 522:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 531:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 300:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 301:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 302:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 310:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 311:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 312:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 313:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 314:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 321:
      return '<i class="fas fa-cloud-showers-heavy"></i>';
    case 200:
      return '<i class="fas fa-bolt"></i>';
    case 201:
      return '<i class="fas fa-bolt"></i>';
    case 202:
      return '<i class="fas fa-bolt"></i>';
    case 210:
      return '<i class="fas fa-bolt"></i>';
    case 211:
      return '<i class="fas fa-bolt"></i>';
    case 212:
      return '<i class="fas fa-bolt"></i>';
    case 221:
      return '<i class="fas fa-bolt"></i>';
    case 230:
      return '<i class="fas fa-bolt"></i>';
    case 231:
      return '<i class="fas fa-bolt"></i>';
    case 232:
      return '<i class="fas fa-bolt"></i>';
  }
}

function getDayOfWeek() {
  let day = today.getDay();
  switch (day) {
    case 0:
      return "Monday";
    case 1:
      return "Tuesday";
    case 2:
      return "Wednesday";
    case 3:
      return "Thursday";
    case 4:
      return "Friday";
    case 5:
      return "Saturday";
    case 6:
      return "Sunday";
  }
}

function getWeatherByGeoloc() {
  findLocation(location => {
    console.log(location);
    getDataByCoords(location);
  });
}

//searching the city
let searchButton = document.getElementById("searchButton");
let today = new Date;
document.getElementById("date").innerHTML = getDayOfWeek() + ', ' + today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
window.addEventListener("load", getWeatherByGeoloc);
window.addEventListener("load", timer);
searchButton.addEventListener("click", getDataByCity);