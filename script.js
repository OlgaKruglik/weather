const apiKey = "ee7a82f35fbe71448134006d5a2f14d9";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=";
let apiUrl1 = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=ru&mode=json&q="
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const oneDays = document.querySelector(".four-days")
const fourDay = document.querySelector("#four-days");
const sixteenDay = document.querySelector("#sixteen-day");
const thirtyDay = document.querySelector("#thirty-day");
const weather = document.querySelector(".weather");

async function checkWeather (city,day) {


    let response = await fetch(apiUrl + city +`&appid=${apiKey}`);
        console.log(day);
    if( response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    if(day === "1") {
    let data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    const temps = document.querySelector(".temp");
    const himidity =  document.querySelector(".himidity");
    const wind =  document.querySelector(".wind");
    temps.innerHTML = Math.round(data.main.temp) + "&deg; c";
    himidity.innerHTML = data.main.humidity + "%";
    wind.innerHTML = data.wind.speed + "м/с";

    const weatherType = data.weather[0].main.toLowerCase()
    weatherIcon.src = `images/${weatherType}.png`

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}

 
function addDiv (temper, dayDt, weatherType, day)  {

    weather.style = "display: flex; overflow: scroll;";
    let dayElement = document.createElement("div");
    dayElement.classList.add("day");
    
    let iconElement = document.createElement("img");
    iconElement.classList.add("weather-icon");
    let icon = day.weather[0].main.toLowerCase(); 
    iconElement.src = `images/${icon}.png`;
    dayElement.appendChild(iconElement);
    
    let dateElement = document.createElement("h3");
    dateElement.classList.add("date"); 
    dateElement.innerHTML = dayDt.slice(5,16)
    dayElement.appendChild(dateElement);
    
    
    let tempElement = document.createElement("h4");
    tempElement.classList.add("temp");
    
    let temp = Math.round(temper);
    tempElement.innerHTML = temp + "° c";
    
    dayElement.appendChild(tempElement);
    let statusElement = document.createElement("p");
    statusElement.classList.add("status");
    
    let status = day.weather[0].description;
    statusElement.innerHTML = status;
    dayElement.appendChild(statusElement);
    
    return dayElement;
    }



    if (day === "4") {
        weather.innerHTML = "" 
        const fullUrl = apiUrl1 + city + `&cnt=${day}`+`&appid=${apiKey}`
        response = await fetch(fullUrl);
        data = await response.clone().json(); 
        for (let item of data.list) { 
        let weatherType = item.weather[0].main.toLowerCase(); 
        let dayElement = addDiv (item.main.temp,item.dt_txt,weatherType,item); 
        document.querySelector(".weather").appendChild(dayElement); 
        }
        }
    if (day === "16") {
        weather.innerHTML = "" 
        response = await fetch(apiUrl1 + city + `&cnt=${day}`+`&appid=${apiKey}`);
        data = await response.clone().json(); 
        data.list.forEach(item => { 
        let weatherType = item.weather[0].main.toLowerCase(); 
        let dayElement = addDiv (item.main.temp,item.dt_txt,weatherType,item); 
        document.querySelector(".weather").appendChild(dayElement); 
        });
        }
    

}


searchBtn.addEventListener("click", () => {
    checkWeather (searchBox.value,oneDays.value)
})

fourDay.addEventListener("click", () => {
    checkWeather (searchBox.value,fourDay.value)
} )

sixteenDay.addEventListener("click", () => {
    checkWeather (searchBox.value,sixteenDay.value)
} )




searchBox.addEventListener("keydown", (e) => {
    if(e.keyCode === 13) {
    checkWeather (searchBox.value, oneDays.value) 
}
}) 



