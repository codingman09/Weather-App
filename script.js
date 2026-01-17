const key = "9b0ffc549e4e6fc8e19c4500ecbe63a9";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return alert("Enter city");

    const current = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    ).then(res => res.json());

    document.getElementById("city").innerText = current.name;
    document.getElementById("temp").innerText = Math.round(current.main.temp) + "°C";
    document.getElementById("feels").innerText =
        `Feels like ${Math.round(current.main.feels_like)}°C`;
    document.getElementById("humidity").innerText = current.main.humidity + "%";
    document.getElementById("wind").innerText = current.wind.speed + " km/h";
    document.getElementById("rain").innerText = current.rain ? "Yes" : "No";
    document.getElementById("condition").innerText = current.weather[0].description;

    setIcon(current.weather[0].main, current.weather[0].icon.includes("n"));

    const forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
    ).then(res => res.json());

    showForecast(forecast.list);
}

function setIcon(type, night) {
    let icon = "☀️";
    if (type === "Rain") icon = "🌧️";
    if (type === "Clouds") icon = "☁️";
    if (type === "Thunderstorm") icon = "⛈️";
    if (night && type === "Clear") icon = "🌙";
    document.getElementById("icon").innerText = icon;
}

function showForecast(data) {
    const box = document.getElementById("forecast");
    box.innerHTML = "";

    const days = {};
    data.forEach(d => {
        const day = d.dt_txt.split(" ")[0];
        if (!days[day]) days[day] = d;
    });

    Object.values(days).slice(0, 5).forEach(d => {
        box.innerHTML += `
            <div>
                <p>${d.dt_txt.slice(5,10)}</p>
                <p>${Math.round(d.main.temp)}°</p>
            </div>`;
    });
}