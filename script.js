const apiKey = `e1d895252096f8f0c99f125422ed92f4`; 

document.addEventListener("DOMContentLoaded", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function getWeatherByLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherData(`lat=${lat}&lon=${lon}`);
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(`q=${location}`);
}

function fetchWeatherData(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Location not found');
        return;
    }
    console.log(data);
    document.getElementById('weatherSection').style.display = 'block';
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function showError(error) {
    alert(`Geolocation error: ${error.message}`);
}









// const app=document.querySelector('.weather-app');
// const temp=document.querySelector('.temp');
// const dateOutput=document.querySelector('.date');
// const timeOutput=document.querySelector('.time');
// const conditionOutput=document.querySelector('.condition');
// const nameOutput=document.querySelector('.name');
// const icon=document.querySelector('.icon');
// const cloudOutput=document.querySelector('.cloud');
// const humidityOutput=document.querySelector('.humidity');
// const windOutput=document.querySelector('.wind');
// const form=document.getElementById('location');
// const search=document.querySelector('.search');
// const btn=document.querySelector('.submit');

// let cityInput="Gujarat";
// form.addEventListener("submit", (event)=>
//   {
//     if (search.value.length === 0) {
//       alert('Please enter the city name');
//     } else {
//       const cityInput = search.value; 
//       fetchWeatherData(cityInput)
//         .then(() => { 
//           search.value = "";
//           app.style.opacity = "0";
//         })
//         .catch(error => {
//           console.error("Error fetching weather data:", error);
          
//         });
//     }
//      event.preventDefault();
//   });
// function dayOfTheWeek(day,month,year){
//     const weekday=[
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
// ];
// return weekday[new Date(`${day}/${month}/${year}`).getDay()];

// };

// function fetchWeatherData(cityInput)
// {
//     fetch(`http://api.weatherapi.com/v1/current.json?key=6015e3eb0e0d48dd96d104303240406&q=${cityInput}`)
//     .then(response =>response.json())
//     .then(data=>{
//         console.log(data);
//         temp.innerHTML=data.current.temp_c+ "&#176";
//         conditionOutput.innerHTML=data.current.condition.text;
//         const date=date.location.localtime;
//         const y=parseInt(date.substr(0,4));
//         const m= parseInt(date.substr(5,2));
//         const d=parseInt(date.substr(8,2));
//         const time = date.substr(11);

//         dateOutput.innerHTML='${dayOfTheWeek(d,m,y)} ${d},${m} ${y}';
//         timeOutput.innerHTML=time;
//         nameOutput.innerHTML=date.location.name;
//         const iconId = data.current.condition.icon.substr(
//             "//cdn.weatherapi.com/weather/64x64/".length
//         );
//         icon.src="./icons/" + iconId;

//         cloudOutput.innerHTML = data.current.cloud + "%";
//         humidityOutput.innerHTML=data.current.humidity + "%";
//         windOutput.innerHTML = data.current.wind_kph + "km/h";

//         let timeOfDay ="day";
//         const code = data.current.condition.code;

//         if(!data.current.is_day){
//             timeOfDay="night";
//         }
//         if(code==1000){
//             app.style.backgroundImage='url(night.jpg)';
//             btn.style.background="#e5ba92";
//             if(timeOfDay=="night"){
//                 btn.style.background="#181e27";
//             }
//         } 
//         })
//         .catch(error => {
//             console.error("Error fetching weather data:", error);
//           });
// }
