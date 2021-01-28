<template>
  <div class="flex justify-center mt-8">
    <form
      class="m-4 flex flex-col"
      @submit.prevent="getWeather"
      @keyup.enter="getWeather"
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
import api from "../services/api";

export default {
  data() {
    return {
      city: "",
      weatherData: {},
      iconUrl: "",
      sunrise: "",
      sunset: "",
      isVisible: false,
      // isLoading: false,
    };
  },
  async beforeMount() {
    try {
      const url = await api.getUserPosition();
      const res = await fetch(url);
      const data = await res.json();
      this.city = data.address.city;
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    // As we need this.city, it's better to leave getCoordinates() here instead
    // of extracting to the api.js file
    async getCoordinates() {
      const url = "https://us1.locationiq.com/v1/search.php";
      const key = "pk.0eae67ccc5c0431281c047f921253dbe";
      let lat, lon;
      try {
        const res = await fetch(`${url}?key=${key}&q=${this.city}&format=json`);
        const data = await res.json();
        lat = data[0].lat;
        lon = data[0].lon;
        return [lat, lon];
      } catch (err) {
        console.error(err);
      }
    },
    async getWeather() {
      try {
        const [lat, lon] = await this.getCoordinates();
        const [weatherData, iconUrl, sunrise, sunset] = await api.getWeather(
          lat,
          lon
        );
        this.weatherData = weatherData;
        this.iconUrl = iconUrl;
        this.sunrise = sunrise;
        this.sunset = sunset;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
