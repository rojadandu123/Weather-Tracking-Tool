// =========================
// API CONFIG
// =========================

const apiKey = "YOUR_API_KEY";

// =========================
// CHART
// =========================

const ctx = document.getElementById("weatherChart");

let weatherChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
            label: "Temperature (°C)",
            data: [30, 31, 29, 33, 32],
            borderWidth: 3,
            tension: 0.4
        }]
    },
    options: {
        responsive: true
    }
});

// =========================
// WEATHER SEARCH
// =========================

async function getWeather(cityName = null) {

    const city =
        cityName ||
        document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    if (city.length < 3) {
        alert("Please enter a full city name");
        return;
    }

    try {

        const url =
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city + ", India")}&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        console.log(data);

        if (data.error) {
            alert(data.error.message);
            return;
        }

        updateWeatherCards(data);

        saveWeather(data);

    }
    catch (error) {

        console.error(error);

        alert("Unable to fetch weather data");
    }
}

// =========================
// SAVE TO SPRING BOOT
// =========================

async function saveWeather(data) {

    const weatherData = {
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph
    };

    try {

        await fetch("http://localhost:8080/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(weatherData)
        });

        loadStoredWeather();

    }
    catch (error) {

        console.error(error);

    }
}

// =========================
// UPDATE UI
// =========================

function updateWeatherCards(data) {

    document.getElementById("temp").innerText =
        `${data.current.temp_c.toFixed(1)}°C`;

    document.getElementById("humidity").innerText =
        `${data.current.humidity}%`;

    document.getElementById("wind").innerText =
        `${data.current.wind_kph} km/h`;

    document.getElementById("condition").innerText =
        `${data.current.condition.text}
(${data.location.name}, ${data.location.country})`;
}

// =========================
// LOAD DATABASE RECORDS
// =========================

async function loadStoredWeather() {

    try {

        const response =
        await fetch("http://localhost:8080/weather");

        const data =
        await response.json();

        let table = `
        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>City</th>
                <th>Temperature</th>
                <th>Condition</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
            </tr>
        `;

        data.forEach(weather => {

            table += `
            <tr>
                <td>${weather.id}</td>
                <td>${weather.city}</td>
                <td>${weather.temperature}°C</td>
                <td>${weather.condition}</td>
                <td>${weather.humidity}%</td>
                <td>${weather.windSpeed} km/h</td>
            </tr>
            `;
        });

        table += `</table>`;

        const tableDiv =
        document.getElementById("weatherTable");

        if(tableDiv){
            tableDiv.innerHTML = table;
        }

    }
    catch(error) {

        console.error(error);

    }
}

// =========================
// CITY CARDS CLICK
// =========================

document.querySelectorAll(".city-card")
.forEach(card => {

    card.addEventListener("click", () => {

        getWeather(card.innerText.trim());

    });

});

// =========================
// ENTER KEY SEARCH
// =========================

document
.getElementById("cityInput")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        getWeather();

    }

});

// =========================
// DARK MODE
// =========================

const themeBtn =
document.querySelector(".theme-btn");

let dark = true;

themeBtn.addEventListener("click", () => {

    if(dark){

        document.body.style.background =
        "linear-gradient(135deg,#f8fafc,#e2e8f0)";

        document.body.style.color =
        "black";

        themeBtn.innerText =
        "☀ Light Mode";

    }
    else{

        document.body.style.background =
        "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)";

        document.body.style.color =
        "white";

        themeBtn.innerText =
        "🌙 Dark Mode";

    }

    dark = !dark;

});

// =========================
// PAGE LOAD
// =========================

window.onload = () => {

    document.getElementById("cityInput").value =
    "Hyderabad";

    getWeather("Hyderabad");

    loadStoredWeather();

};