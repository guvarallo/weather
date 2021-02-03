<template>
  <div class="flex justify-center mt-8 mb-8">
    <form
      class="m-4 flex flex-col"
      @submit.prevent="getWeather"
      @keyup.enter="getWeather"
    >
      <input
        type="text"
        ref="search"
        @click="this.inputCity = ''"
        v-model="inputCity"
        class="text-gray-800 border-gray-200 border rounded p-3 text-center "
        placeholder="Enter the city name"
      />
      <button
        v-if="!isLoading"
        class="rounded transition duration-300 ease-in-out text-white bg-blue-600 hover:bg-purple-600 transform p-3 mt-3"
      >
        Search
      </button>
      <button v-else class="rounded text-white bg-gray-400 p-3 mt-3" disabled>
        Loading
      </button>
      <div v-if="isLoading" class="lds-circle text-center mt-14">
        <div></div>
      </div>
    </form>
  </div>
  <Error v-if="error.length > 0" :error="error" />
  <Main
    :weatherData="weatherData"
    :localTime="localTime"
    :sunrise="sunrise"
    :sunset="sunset"
    :isLoading="isLoading"
    :city="city"
    :iconUrl="iconUrl"
  />
  <Forecast
    :weatherData="weatherData"
    :isLoading="isLoading"
    :daily="daily"
    :city="city"
  />
</template>

<script>
import { GOOGLE_KEY } from "../services/apiKeys";
import api from "../services/api";
import Error from "./Error";
import Main from "./Weather/Main";
import Forecast from "./Forecast";

export default {
  components: {
    Error,
    Main,
    Forecast,
  },
  data() {
    return {
      inputCity: "",
      city: "",
      weatherData: {},
      daily: [],
      iconUrl: "",
      sunrise: "",
      sunset: "",
      localTime: "",
      isLoading: false,
      error: "",
    };
  },
  async beforeMount() {
    this.isLoading = true;
    try {
      const userPositionData = await api.getUserPosition();
      this.inputCity = userPositionData.address.city;
      this.city = userPositionData.address.city;

      this.getWeather();
    } catch (err) {
      this.isLoading = false;
      this.error = err;
    }
  },
  mounted() {
    window.checkAndAttachMapScript = function(callback) {
      if (window.google) {
        callback();
        return true;
      }

      window.mapApiInitialized = callback;
      let script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places,geometry&callback=mapApiInitialized`;
      document.body.appendChild(script);
    };

    window.checkAndAttachMapScript(this.initLocationSearch);
  },
  methods: {
    initLocationSearch() {
      let autocomplete = new window.google.maps.places.Autocomplete(
        this.$refs.search
      );
      autocomplete.addListener(
        "place_changed",
        function() {
          let place = autocomplete.getPlace();
          if (place && place.address_components) {
            this.inputCity = place.address_components[0].long_name;
          }
        }.bind(this)
      );
    },
    async getWeather() {
      if (this.inputCity === "") return;

      this.isLoading = true;
      this.error = "";
      this.weatherData = {};
      this.daily = [];

      try {
        this.city = this.inputCity;
        const [lat, lon] = await api.getCoordinates(this.inputCity);

        const data = await api.getWeather(lat, lon);

        this.weatherData = data;
        this.handleWeatherData(data);
      } catch (err) {
        this.isLoading = false;
        this.error = err;
      }
    },
    handleWeatherData(data) {
      data.daily.shift(); //remove first item as it's today's date
      this.daily = data.daily;
      this.iconUrl = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;

      //Calculate timezone before setting sunrise/sunset/localTime
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
      this.sunrise = `${sunriseHour}:${
        sunriseMinute < 10 ? `0${sunriseMinute}` : sunriseMinute
      }`;
      this.sunset = `${sunsetHour}:${
        sunsetMinute < 10 ? `0${sunsetMinute}` : sunsetMinute
      }`;
      this.localTime = `${localTimeHour}:${
        localTimeMinute < 10 ? `0${localTimeMinute}` : localTimeMinute
      }`;
      this.isLoading = false;
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
  width: 500px;
  height: 500px;
  margin: 8px;
  border-radius: 50%;
  background: linear-gradient(#7c3aed, #2563eb);
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

@media (max-width: 600px) {
  .lds-circle > div {
    width: 350px !important;
    height: 350px !important;
  }
}
</style>
