<template>
  <div
    v-if="Object.keys(weatherData).length !== 0 && !isLoading"
    class="min-w-screen min-h-half flex items-center justify-center px-5 py-5 bg-gradient-to-b from-purple-600 to-blue-600"
  >
    <div
      class="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
      style="max-width: 500px"
    >
      <div class="w-full pt-1 pb-5">
        <p class="text-4xl text-gray-600 px-5 mb-3">City of {{ city }}</p>
        <p class="text-sm text-gray-600 px-5">
          Local time now: {{ localTime }}h
        </p>
        <p class="text-sm text-gray-600 px-5">
          Condition: {{ weatherData.current.weather[0].main }}
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p class="text-5xl text-gray-600 px-5">
          {{ Math.round(weatherData.current.temp - 273.15) }}°C
        </p>
        <img :src="iconUrl" alt="weather icon" class="w-20 float-right" />
      </div>
      <div class="w-full mb-10 mt-5">
        <p class="text-sm text-gray-600 px-5">
          Today's lowest:
          {{ Math.round(weatherData.daily[0].temp.min - 273.15) }}°C
        </p>
        <p class="text-sm text-gray-600 px-5">
          Today's highest:
          {{ Math.round(weatherData.daily[0].temp.max - 273.15) }}°C
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
};
</script>
