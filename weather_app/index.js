const apiKey = "983fde8dfb9f7d61fec3624078595180"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("city-name");
const getWeatherButton = document.getElementById("get-weather");
const weatherInfoElement = document.getElementById("weather-info");

getWeatherButton.addEventListener("click", function () {
  const cityName = cityInput.value;
  if (!cityName) {
    alert("Please enter a city name!");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert(`Error: ${data.message}`);
        return;
      }

      const weatherDescription = data.weather[0].main;
      const temperature = Math.round(data.main.temp - 273.15); // Convert kelvin to celsius
      const feelsLike = Math.round(data.main.feels_like - 273.15); // Convert kelvin to celsius

      weatherInfoElement.innerHTML = `
        <h3>Weather in ${cityName}:</h3>
        <p>Description: ${weatherDescription}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels like: ${feelsLike}°C</p>
      `;
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching weather data!");
    });
});
