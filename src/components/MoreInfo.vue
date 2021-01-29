<template>
  <span
    v-if="!isVisible"
    @click="isVisible = !isVisible"
    class="pointer text-md text-blue-600 font-bold text-center"
    >Click here for more info</span
  >
  <span
    v-else
    @click="isVisible = !isVisible"
    class="pointer text-md text-blue-600 font-bold text-center"
    >Click here for less info</span
  >
  <div v-show="isVisible" class="w-full mt-5">
    <p class="text-sm text-gray-600 px-5">
      Wind speed:
      {{ Math.round((weatherData.current.wind_speed * 18) / 5) }} km/h
    </p>
    <p class="text-sm text-gray-600 px-5">
      Humidity: {{ weatherData.current.humidity }}%
    </p>
    <p class="text-sm text-gray-600 px-5">
      Pressure: {{ weatherData.current.pressure }} mb
    </p>
    <p class="text-sm text-gray-600 px-5">Sunrise: {{ sunrise }}h</p>
    <p class="text-sm text-gray-600 px-5">Sunset: {{ sunset }}h</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    weatherData: Object,
    sunrise: String,
    sunset: String,
  },
};
</script>
