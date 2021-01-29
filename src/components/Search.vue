<template>
  <div class="flex justify-center mt-8">
    <form
      class="m-4 flex flex-col"
      @submit.prevent="getWeather"
      @keyup.enter="getWeather"
    >
      <input
        type="text"
        v-model.lazy="city"
        class="text-gray-800 border-gray-200 border rounded p-3 text-center "
        placeholder="Enter the city name"
      />
      <button
        v-if="!isLoading"
        class="rounded transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-red-600 transform p-3 mt-3"
      >
        Search
      </button>
      <button v-else class="rounded text-white bg-gray-600 p-3 mt-3" disabled>
        Loading
      </button>
      <div v-if="isLoading" class="lds-circle text-center mt-14">
        <div></div>
      </div>
    </form>
  </div>
  <Weather
    :weatherData="weatherData"
    :localTime="localTime"
    :sunrise="sunrise"
    :sunset="sunset"
    :isLoading="isLoading"
    :city="city"
    :iconUrl="iconUrl"
  />
</template>

<script>
import api from "../services/api";
import Weather from "./Weather";

export default {
  components: {
    Weather,
  },
  data() {
    return {
      city: "",
      weatherData: {},
      iconUrl: "",
      sunrise: "",
      sunset: "",
      localTime: "",
      isLoading: false,
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
      this.isLoading = true;
      try {
        const [lat, lon] = await this.getCoordinates();
        const [
          weatherData,
          iconUrl,
          sunrise,
          sunset,
          localTime,
        ] = await api.getWeather(lat, lon);
        this.weatherData = weatherData;
        this.iconUrl = iconUrl;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.localTime = localTime;
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}

.lds-circle {
  display: inline-block;
  transform: translateZ(1px);
}

.lds-circle > div {
  display: inline-block;
  width: 164px;
  height: 164px;
  margin: 8px;
  border-radius: 50%;
  background: #2563eb;
  animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

@keyframes lds-circle {
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
