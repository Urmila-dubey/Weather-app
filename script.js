const input = document.getElementById("city-input");
const button = document.getElementById("search-btn");
const message = document.getElementById("message");

// Weather display elements
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const desc = document.getElementById("description");
const wind = document.getElementById("wind");
const icon = document.getElementById("icon");

// Your API key
const apiKey = "";

// Function: fetch weather
async function getWeather() {
    const city = input.value.trim();

    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    message.textContent = ""; // clear error

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            message.textContent = "City not found!";
            return;
        }

        const data = await response.json();

        // update UI
        cityName.textContent = data.name;
        temp.textContent = data.main.temp + "°C";
        desc.textContent = data.weather[0].description;
        wind.textContent = "Wind: " + data.wind.speed + " m/s";

        const iconCode = data.weather[0].icon;
        icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        message.textContent = "Error fetching data.";
    }
}

// Search button click
button.addEventListener("click", getWeather);

