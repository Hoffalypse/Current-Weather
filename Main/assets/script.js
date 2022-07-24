let searchButton = document.getElementById("search-btn");
let cityInput=document.getElementById("city-input");
//populate all fields in main box using api



// add color coating to UV index 
//populate field in future box
// get dates for main box and future boxes
currentDay = document.getElementById("city-name");
let date = moment().format('(MMMM Do, YYYY)');
currentDay.append(date);

dayOne = document.getElementById("day1");
let tomorrow = moment().add(1, 'days').calendar('MMMM/Do'); 
dayOne.append(tomorrow);

dayTwo = document.getElementById("day2");
let  dayPlusTwo= moment().add(2, 'days').calendar('MMMM/Do'); 
dayTwo.append(dayPlusTwo);

dayThree = document.getElementById("day3");
let  dayPlusThree= moment().add(3, 'days').calendar('MMMM/Do'); 
dayThree.append(dayPlusThree);

dayFour = document.getElementById("day4");
let  dayPlusFour= moment().add(4, 'days').calendar('MMMM/Do'); 
dayFour.append(dayPlusFour);

dayFive = document.getElementById("day5");
let  dayPlusFive= moment().add(5, 'days').calendar('MMMM/Do'); 
dayFive.append(dayPlusFive);

// use search button to render searched city button

searchButton.addEventListener("click", addCity);

function addCity() {
    
    let searchCity = document.getElementById("search-city").value; //input line 
    
    if (searchCity !== "") {
        let city = document.createElement("button"); //created drop button
        let listGroup = document.querySelector(".list-group"); //parent
        city.type = "submit";
        city.setAttribute("class", "list-group-item list-group-item-action btn-edit");
        city.setAttribute("value", "text");
        city.setAttribute("id", "city-button");
        city.innerText = searchCity;
        listGroup.append(city);
        getApi();
        
        city.addEventListener("click",listItem)
        function listItem  () {
            city=searchCity;
        }
        return(searchCity);
    }

function getApi() {
    
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchCity + ',us&limit=1&appid=d66f0bb9a7a8a8e06249ebf3d284dfb9';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
        for (let i = 0; i < data.length; i++) {
             lat = data[i].lat;
             lon = data[i].lon;
             console.log(lon);
             console.log(lat);
        }
        
        let requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=d66f0bb9a7a8a8e06249ebf3d284dfb9'
        fetch(requestUrl2)
        .then(function (response) {
        return response.json();
         })
         .then(function (data2) {
            console.log(data2);
            for (let x = 0; x < data2.length; x++) {
           
            currentTemp = data2[x].current.temp;
            console.log(currentTemp);
            
             }})
        });
      
  }
}
  