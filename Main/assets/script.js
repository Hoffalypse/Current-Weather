let searchButton = document.getElementById("search-btn");
let cityInput = document.getElementById("city-input");
let listGroup = document.querySelector(".list-group"); //parent
let currentTemp = document.getElementById("temp");
let currentWind = document.getElementById("wind");
let currentHumidity = document.getElementById("humidity");
let currentUv = document.getElementById("uv");
let today = document.getElementById("city-input");
let currentDay = document.getElementById("city-name");
let date = moment().format("(MMMM Do, YYYY)");
var listOfCity = document.querySelector("#listOfCity");
let day = ["day1", "day2", "day3", "day4", "day5"];
let hum = ["hum1", "hum2", "hum3", "hum4", "hum5"];
let wind = ["wind1", "wind2", "wind3", "wind4", "wind5"];
let dates = ["date1", "date2", "date3", "date4", "date5"];
let emojis = ["emoji1","emoji2","emoji3","emoji4","emoji5"]
let cityArray = [];

function loadSaved() {
 returnSearch = JSON.parse(localStorage.getItem("city" ));
if (returnSearch != null) {
      for (let o = 0; o < returnSearch.length; o++) {
      addCity(returnSearch[o]);
   }

}
}
loadSaved()

function addCity(returnSearch) {
  let searchCity = document.getElementById("search-city").value; //input line
    
    if (searchCity==="") {

     searchCity=returnSearch;
    }   
      let city = document.createElement("button"); //created drop button
      city.setAttribute("id", "city-button");
      city.type = "submit";
      city.setAttribute( "class", "list-group-item list-group-item-action btn-edit");
      city.setAttribute("value", searchCity);
      city.innerText = searchCity;
      cityArray.push(searchCity)
      localStorage.setItem("city", JSON.stringify(cityArray));
      listGroup.append(city);

    getApi(searchCity); 
    
  }

//turn city name into geo location data 
function getApi(searchCity) {
  
  let requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&limit=1&appid=d66f0bb9a7a8a8e06249ebf3d284dfb9";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        lat = data[i].lat;
        lon = data[i].lon;
        weatherData(lat, lon, searchCity);

      }
    });
}

//populate weather fields of particular city
function weatherData(lat, lon, searchCity) {
  let requestUrl2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=d66f0bb9a7a8a8e06249ebf3d284dfb9";
  fetch(requestUrl2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      currentEmoji = data2.current.weather[0].main;
      today.innerHTML = searchCity + date + weatherEmoji(currentEmoji);
      currentTemp.textContent = data2.current.temp + "°F";
      currentHumidity.textContent = data2.current.humidity + "%";
      currentWind.textContent = data2.current.wind_speed + "MPH";
      currentUv.textContent = data2.current.uvi;
      test = data2.current.uvi;
      // add color coating to UV index
      if (test <= 2) {
        currentUv.style.backgroundColor = "green";
      } else if (test > 2 && test < 5) {
        currentUv.style.backgroundColor = "yellow";
      } else {
        currentUv.style.backgroundColor = "red";
      }
      console.log(data2);
      for (let i = 0; i < 5; i++) {
        futureTemp = data2.daily[i].temp.max;
        futureHumidity = data2.daily[i].humidity;
        futureWind = data2.daily[i].wind_speed;
        futureEmoji = data2.daily[i].weather[0].main;
        document.getElementById(dates[i]).textContent = moment().add(i + 1, "days").calendar("MMMM/Do");
        document.getElementById(emojis[i]).textContent = weatherEmoji(futureEmoji);
        document.getElementById(day[i]).textContent = "Temp: " + futureTemp + "°F";
        document.getElementById(hum[i]).textContent ="Humidity: " + futureHumidity + "%";
        document.getElementById(wind[i]).textContent ="Wind: " + futureWind + "MPH";
        
      }
      function weatherEmoji(rep) {
        if (rep === "Clear") {
             emoji = "🌞";  
        }
        else if (rep === "Clouds") {
            emoji = "☁️"
        }
        else if (rep === "Thunderstorm"){
            emoji = "⛈️"
        }
        else if (rep === "Drizzle") {
            emoji = "🌦️"
        }
        else if (rep === "Rain") {
            emoji = "🌧️"
        }
        else if (rep === "snow") {
            emoji = "❄️"
        }
        return(emoji);
    }
    });
    
}


// use search button to render searched city button
searchButton.addEventListener("click", addCity);

//makes drop down buttons repopulate the information for that city 
listOfCity.addEventListener("click", cityHistory);
function cityHistory(event) {
  let searchCity = event.target.value;
  getApi(searchCity);
}
