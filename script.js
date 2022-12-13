let weather = {
  apiKey: '60aeac6e09557f96b9377825f46a26ad',
  message: document.querySelector('.message'),
  weatherBlock: document.querySelector('.weather'),
  fetchWeather: function(city, lon, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lon=${lon}&lat=${lat}&units=metric&appid=${this.apiKey}`)
    .then((Response) => Response.json())
    .then((data) => {
      this.displayWeather(data);
      this.message.classList.remove('message-active');
      this.weatherBlock.classList.add('weather-active');
    })
    .catch(() => {
      this.message.classList.add('message-active');
      this.message.innerHTML = `Not found`;
      this.weatherBlock.classList.remove('weather-active');
    })
    .finally(() => {});
  },
  displayWeather: function(data) {
    const {name, dt, timezone} = data;
    const {country} = data.sys;
    const {temp, feels_like, humidity} = data.main;
    const {description, icon} = data.weather[0];
    const {speed} = data.wind;

    function editTime(time) {
      let hours = time.getUTCHours();
      let minutes = time.getUTCMinutes();
      if(hours.toString().length < 2) {
        hours = '0' + hours;
      }
      if(minutes.toString().length < 2) {
        minutes = '0' + minutes;
      }
      return `${hours}:${minutes}`
    }

    document.querySelector('.city').innerHTML = `${name}, ${country}`;
    document.querySelector('.temp-info img').src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.temp-info p').innerHTML = `${Math.round(temp)} °C`;
    document.querySelector('.temp-description').innerHTML = description;
    document.querySelector('.local-time span').innerHTML = `${editTime(new Date((dt + timezone) * 1000))}`;
    document.querySelector('.humidity span').innerHTML = `${humidity} %`;
    document.querySelector('.wind span').innerHTML = `${speed} m/s`;
    document.querySelector('.feels-like span').innerHTML = `${Math.round(feels_like)} °C`;
  },
  searchCity: function () {
    const searchInput = document.querySelector('.location input');
    searchInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
      this.fetchWeather(searchInput.value.trim());
      searchInput.value = '';
      this.message.classList.add('message-active');
      this.message.innerHTML = 'Getting weather details...';
    }
  })
  },
  getPosition: function() {
    let locationBtn = document.querySelector('.get-location');
    locationBtn.addEventListener('click', () => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.message.classList.add('message-active');
        this.message.innerHTML = 'Getting weather details...'
        weather.fetchWeather('', position.coords.longitude, position.coords.latitude);
      },
      () => {
        this.message.classList.add('message-active');
        this.message.innerHTML = 'You denied geolocation search.';
        this.weatherBlock.classList.remove('weather-active');
      }
      )
    })
  },
   
}
weather.searchCity();
weather.getPosition();

console.log(new Date(1670863736 * 1000));
