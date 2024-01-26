async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]
  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // 👉 Tasks 1 - 5 go here
  const citySelect = document.querySelector('#citySelect')
  const pInfo = document.querySelector(".info")

  let selectedCity = '';
  let data;

  citySelect.addEventListener("change", async () => {
    selectedCity = citySelect.value;


    if (selectedCity) {
      citySelect.disabled = true;
    }

    pInfo.textContent = `Fetching weather data...`

    data = await getWeather(selectedCity)
    setTimeout(() => {
      enableSelectedCityDropdown()
      emptyParagraph()
      constructForecast(data)
      constructCurrent(data)

      let location = document.querySelector("#location");
      let locationFirstChild = location.children[0]
      let locationLastChild = location.children[1]

      locationFirstChild.textContent = selectedCity
      locationLastChild.textContent = data.location.country
      enableWeatherWidget()

    }, 1000)
  })

  async function getWeather(selectedCity) {
    const apiURL = `http://localhost:3003/api/weather?city=${selectedCity}`;

    let response = await axios.get(apiURL)
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error.message)
      })

    return response
  }

  function emptyParagraph() {
    var infoParagraph = document.querySelector(".info")
    infoParagraph.textContent = ''
  }

  // 1. Re-enable the **dropdown**.
  function enableSelectedCityDropdown() {
    citySelect.disabled = false;
  }

  // 1. Modify the inline style on the **div#weatherWidget** to make the element visible again.
  function enableWeatherWidget() {
    let weatherWidget = document.getElementById('weatherWidget')
    weatherWidget.style.display = 'block'
  }

  // Finally, the main course! Use the API data to inject the correct information into the DOM, replacing the "placeholder" information in the HTML.
  function constructCurrent(data) {
    let today = document.querySelector("#today")
    let apparentTemp = document.querySelector("#apparentTemp")
    let apparentTempLastChild = apparentTemp.children[1];
    const currentForecast = data.current

    let emoji = descriptions.find((ele) => {

      if (ele[0] === currentForecast.weather_description) {
        return ele;
      }
    })
    let todayDescription = document.querySelector('#todayDescription');
    let todayStats = document.querySelector('#todayStats');
    let todayStatsFirstChild = todayStats.children[0]
    let todayStatsSecondChild = todayStats.children[1]
    let todayStatsThirdChild = todayStats.children[2]
    let todayStatsLastChild = todayStats.children[3]

    todayDescription.textContent = emoji[1];
    apparentTempLastChild.textContent = currentForecast.apparent_temperature;
    todayStatsFirstChild.textContent = `${currentForecast.temperature_min}° / ${currentForecast.temperature_max}°`;
    todayStatsSecondChild.textContent = `Precipitation: ${currentForecast.precipitation_probability * 100}%`;
    todayStatsThirdChild.textContent = `Humidity: ${currentForecast.humidity}%`;
    todayStatsLastChild.textContent = `Wind: ${currentForecast.wind_speed}m/s`;

    return today
  }

  function constructForecast(data) {
    let forecast = document.querySelector('#forecast')
    let days = forecast.querySelectorAll('.next-day.card.col');



    days.forEach((day, idx) => {
      let dayFirstChild = day.children[0]
      let daySecondChild = day.children[1]
      let dayThirdChild = day.children[2]
      let dayLastChild = day.children[3]

      const dailyForecastArr = data.forecast.daily

      let emoji = descriptions.find((ele) => {
        if (ele[0] === dailyForecastArr[idx].weather_description) {
          return ele;
        }
      })
      const newDate = new Date(dailyForecastArr[idx].date)
      const d = newDate.getDay();

      dayFirstChild.textContent = daysOfWeek[d];
      daySecondChild.textContent = emoji[1];
      dayThirdChild.textContent = `${dailyForecastArr[idx].temperature_min}° / ${dailyForecastArr[idx].temperature_max}°`;
      dayLastChild.textContent = `Precipitation: ${dailyForecastArr[idx].precipitation_probability * 100}%`;


    })

    return forecast

  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
