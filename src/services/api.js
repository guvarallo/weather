const api = {
  async getUserPosition() {
    try {
      const userPos = await new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const lat = userPos.coords.latitude;
      const lon = userPos.coords.longitude;
      const url =
        "https://us1.locationiq.com/v1/reverse.php?key=pk.0eae67ccc5c0431281c047f921253dbe&lat=" +
        lat +
        "&lon=" +
        lon +
        "&format=json";
      return url;
    } catch (err) {
      return err;
    }
  },
  async getWeather(lat, lon) {
    const url = "https://api.openweathermap.org/data/2.5/onecall";
    const key = "7ac325fd18f5ce43cc1cc62f3e3da84f";
    let weatherData, iconUrl, sunrise, sunset, localTime;
    try {
      const res = await fetch(
        `${url}?lat=${lat}&lon=${lon}&exclude=alerts&appid=${key}`
      );
      const data = await res.json();

      weatherData = data;
      iconUrl = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

      //Calculate timezone before setting sunrise/sunset times
      const sunriseTimeData = new Date(
        (data.current.sunrise + data.timezone_offset) * 1000
      );
      const sunsetTimeData = new Date(
        (data.current.sunset + data.timezone_offset) * 1000
      );
      const localTimeData = new Date(
        (data.current.dt + data.timezone_offset) * 1000
      );
      const sunriseHour = sunriseTimeData.getUTCHours();
      const sunsetHour = sunsetTimeData.getUTCHours();
      const localTimeHour = localTimeData.getUTCHours();
      const sunriseMinute = sunriseTimeData.getUTCMinutes();
      const sunsetMinute = sunsetTimeData.getUTCMinutes();
      const localTimeMinute = localTimeData.getUTCMinutes();
      sunrise = `${sunriseHour}:${
        sunriseMinute < 10 ? `0${sunriseMinute}` : sunriseMinute
      }`;
      sunset = `${sunsetHour}:${
        sunsetMinute < 10 ? `0${sunsetMinute}` : sunsetMinute
      }`;
      localTime = `${localTimeHour}:${
        localTimeMinute < 10 ? `0${localTimeMinute}` : localTimeMinute
      }`;
      return [weatherData, iconUrl, sunrise, sunset, localTime];
    } catch (err) {
      return err;
    }
  },
};

export default api;
