const apiKey = "795dbf63481d913b2362dee54c3597e7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const timestamp = new Date().getTime();
    const response = await fetch(apiUrl + city + `&appid=${apiKey}&_=${timestamp}`);
    var data = await response.json();

    console.log(data);

    if (response.status == 404) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid City Name!',
        });
    } else {
        let displayDate = document.getElementById("date");

        // Get the timezone offset in seconds from the API response
        const timezoneOffsetSeconds = data.timezone;

        // Calculate the current date and time in the searched city's timezone
        const currentDateTime = luxon.DateTime.utc().plus({ seconds: timezoneOffsetSeconds });
        const formattedDate = currentDateTime.toLocaleString({
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        });

        displayDate.innerHTML = formattedDate;

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".country").innerHTML = data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.svg"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear-day.svg"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.svg"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.svg"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.svg"
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.svg"
        }
        else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "images/smoke.svg"
        }

        else if (data.weather[0].main == "Fog") {
            weatherIcon.src = "fog/.svg"
        }

        else if (data.weather[0].main == "Thunderstorm") {
            weatherIcon.src = "thunderstorms/.svg"
        }
        else if (data.weather[0].main == "Tornado") {
            weatherIcon.src = "tornado/.png"
        }

        document.querySelector(".weather").style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})