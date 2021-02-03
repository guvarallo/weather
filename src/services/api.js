import { LOCATION_IQ_KEY, OPEN_WEATHER_KEY } from "./apiKeys";

const locationIqUrl = "https://us1.locationiq.com/v1/";

const api = {
  async getUserPosition() {
    try {
      const userPos = await new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const lat = userPos.coords.latitude;
      const lon = userPos.coords.longitude;
      const res = await fetch(
        `${locationIqUrl}reverse.php?key=${LOCATION_IQ_KEY}&lat=` +
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
    const openWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall";
    try {
      const res = await fetch(
        `${openWeatherUrl}?lat=${lat}&lon=${lon}&exclude=alerts&appid=${OPEN_WEATHER_KEY}`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw "City not found, please type a correct city name.";
    }
  },
  async getCoordinates(city) {
    let lat, lon;
    try {
      const res = await fetch(
        `${locationIqUrl}search.php?key=${LOCATION_IQ_KEY}&q=${city}&format=json`
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
