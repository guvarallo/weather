<template>
  <div class="flex justify-center mt-8">
    <form
      class="m-4 flex flex-col"
      @submit.prevent="getWeather"
      @keypress="handleKeyPress"
    >
      <input
        type="text"
        v-model="city"
        class="text-gray-800 border-gray-200 border rounded p-3 text-center "
        placeholder="Enter the city name"
      />
      <button
        class="rounded transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-red-600 transform p-3 mt-3"
      >
        Search
      </button>
    </form>
  </div>

  <div
    class="flex justify-center items-center flex-col mt-10"
    v-if="Object.keys(weatherData).length !== 0"
  >
    <h1>City of {{ city }}</h1>
    <div class="flex justify-center flex-col items-center">
      <img :src="iconUrl" alt="weather icon" class="w-14" />
      <p class="">{{ Math.round(weatherData.current.temp - 273.15) }}°C</p>
    </div>

    <p class="">
      Today's lowest: {{ Math.round(weatherData.daily[0].temp.min - 273.15) }}°C
    </p>
    <p class="">
      Today's highest:
      {{ Math.round(weatherData.daily[0].temp.max - 273.15) }}°C
    </p>
    <span v-on:click="isVisible = !isVisible">More info</span>
    <div v-show="isVisible">
      <p>
        Wind speed:
        {{ Math.round((weatherData.current.wind_speed * 18) / 5) }} km/h
      </p>
      <p>Humidity: {{ weatherData.current.humidity }}%</p>
      <p>Pressure: {{ weatherData.current.pressure }} mb</p>
      <p>Sunrise: {{ sunrise }}h</p>
      <p>Sunset: {{ sunset }}h</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      lat: "",
      lon: "",
      weatherData: {},
      iconUrl: "",
      isLoading: false,
      isVisible: false,
      sunrise: "",
      sunset: "",
    };
  },
  async beforeMount() {
    const getUserPosition = () => {
      return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };
    const data = await getUserPosition();
    const lat = data.coords.latitude;
    const lon = data.coords.longitude;

    const url =
      "https://us1.locationiq.com/v1/reverse.php?key=pk.0eae67ccc5c0431281c047f921253dbe&lat=" +
      lat +
      "&lon=" +
      lon +
      "&format=json";

    fetch(url)
      .then(res => res.json())
      .then(data => (this.city = data.address.city))
      .catch(err => console.error(err));
  },
  methods: {
    getCoordinates() {
      const url = "https://us1.locationiq.com/v1/search.php";
      const key = "pk.0eae67ccc5c0431281c047f921253dbe";
      return fetch(`${url}?key=${key}&q=${this.city}&format=json`)
        .then(res => res.json())
        .then(data => {
          this.lat = data[0].lat;
          this.lon = data[0].lon;
        });
    },
    async getWeather() {
      await this.getCoordinates();
      const url = "https://api.openweathermap.org/data/2.5/onecall";
      const key = "7ac325fd18f5ce43cc1cc62f3e3da84f";
      return fetch(
        `${url}?lat=${this.lat}&lon=${this.lon}&exclude=alerts&appid=${key}`
      )
        .then(res => res.json())
        .then(data => {
          this.weatherData = data;
          this.iconUrl = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

          const sunriseDate = new Date(
            (data.current.sunrise + data.timezone_offset) * 1000
          );
          const sunsetDate = new Date(
            (data.current.sunset + data.timezone_offset) * 1000
          );
          const sunriseHour = sunriseDate.getUTCHours();
          const sunsetHour = sunsetDate.getUTCHours();
          const sunriseMinute = sunriseDate.getUTCMinutes();
          const sunsetMinute = sunsetDate.getUTCMinutes();
          this.sunrise = `${sunriseHour}:${
            sunriseMinute < 10 ? `0${sunriseMinute}` : sunriseMinute
          }`;
          this.sunset = `${sunsetHour}:${
            sunsetMinute < 10 ? `0${sunsetMinute}` : sunsetMinute
          }`;
        })
        .catch(err => console.error(err));
    },
    handleKeyPress(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        this.getWeather();
      }
    },
  },
};
</script>
