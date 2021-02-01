import { locationIqKey, openWeatherKey } from "./apiKeys";

const api = {
  async getUserPosition() {
    try {
      const userPos = await new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const lat = userPos.coords.latitude;
      const lon = userPos.coords.longitude;
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${locationIqKey}&lat=` +
          lat +
          "&lon=" +
          lon +
          "&format=json"
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw "Please allow access to your location for weather information in your city.";
    }
  },
  async getWeather(lat, lon) {
    const url = "https://api.openweathermap.org/data/2.5/onecall";
    try {
      const res = await fetch(
        `${url}?lat=${lat}&lon=${lon}&exclude=alerts&appid=${openWeatherKey}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw "City not found, please type a correct city name.";
    }
  },
  async getCoordinates(city) {
    const url = "https://us1.locationiq.com/v1/search.php";
    let lat, lon;
    try {
      const res = await fetch(
        `${url}?key=${locationIqKey}&q=${city}&format=json`
      );
      const data = await res.json();
      lat = data[0].lat;
      lon = data[0].lon;
      return [lat, lon];
    } catch (err) {
      console.error(err);
      throw "City not found, please type a correct city name.";
    }
  },
};

export default api;
