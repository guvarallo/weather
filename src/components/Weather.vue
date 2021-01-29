<template>
  <div
    v-if="Object.keys(weatherData).length !== 0 && !isLoading"
    class="min-w-screen mt-14"
  >
    <p class="text-5xl text-blue-600 px-5 mb-3 text-center">
      {{ city }}
    </p>
    <p class="text-lg text-blue-600 px-5 text-center mb-12">
      Local time now: {{ localTime }}h
    </p>
    <div
      class="flex items-center mx-auto rounded-full bg-gradient-to-b from-purple-600 to-blue-600 shadow-lg w-ball h-ball text-white p-6"
      style="max-width: 500px"
    >
      <div>
        <p class="text-base text-white w-20">
          Min
          <strong
            >{{ Math.round(weatherData.daily[0].temp.min - 273.15) }}°C</strong
          >
        </p>
      </div>
      <div class="flex flex-col justify-around w-ball h-ball">
        <div>
          <p class="text-5xl text-white text-center">
            {{ Math.round(weatherData.current.temp - 273.15) }}°C
          </p>
          <p class="text-lg text-white text-center mt-2">
            Feels like
            <strong
              >{{
                Math.round(weatherData.current.feels_like - 273.15)
              }}°C</strong
            >
          </p>
        </div>
        <div
          class="flex flex-col justify-center items-center"
          style="margin-top: -50px"
        >
          <img
            :src="iconUrl"
            alt="weather icon"
            class="text-lg text-white text-center"
          />
          <p class="text-lg text-white text-center">
            Condition: {{ weatherData.current.weather[0].main }}
          </p>
        </div>
        <div class="w-full flex flex-col justify-center">
          <MoreInfo
            :weatherData="weatherData"
            :sunrise="sunrise"
            :sunset="sunset"
          />
        </div>
      </div>
      <div>
        <p class="text-base text-white w-20">
          Max
          <strong
            >{{ Math.round(weatherData.daily[0].temp.max - 273.15) }}°C</strong
          >
        </p>
      </div>
      <!-- <div class="w-full pt-1 pb-5">
        <p class="text-4xl text-white px-5 mb-3">City of {{ city }}</p>
        <p class="text-sm text-white px-5">Local time now: {{ localTime }}h</p>
        <p class="text-sm text-white px-5">
          Condition: {{ weatherData.current.weather[0].main }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-5xl text-white px-5">
          {{ Math.round(weatherData.current.temp - 273.15) }}°C
        </p>
        <img :src="iconUrl" alt="weather icon" class="w-20 float-right" />
      </div>
      <div class="w-full mb-10 mt-5">
        <p class="text-sm text-white px-5">
          Today's lowest:
          {{ Math.round(weatherData.daily[0].temp.min - 273.15) }}°C
        </p>
        <p class="text-sm text-white px-5">
          Today's highest:
          {{ Math.round(weatherData.daily[0].temp.max - 273.15) }}°C
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import MoreInfo from "./MoreInfo";

export default {
  components: {
    MoreInfo,
  },
  props: {
    weatherData: Object,
    localTime: String,
    sunrise: String,
    sunset: String,
    isLoading: Boolean,
    city: String,
    iconUrl: String,
  },
  methods: {},
};
</script>
