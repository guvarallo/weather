<template>
  <div>
    <p class="sunrise text-center text-white w-20">
      Sunrise <strong>{{ sunrise }}h</strong>
    </p>
  </div>
  <div
    class="container flex flex-col justify-evenly items-center w-ball h-ball"
  >
    <div class="wind text-lg text-white">
      Wind speed
      <strong
        >{{
          Math.round((weatherData.current.wind_speed * 18) / 5)
        }}
        km/h</strong
      >
    </div>
    <div class="humidity text-lg text-white">
      Humidity <strong>{{ weatherData.current.humidity }}%</strong>
    </div>
    <div class="pressure text-lg text-white">
      Pressure <strong>{{ weatherData.current.pressure }} mb</strong>
    </div>
    <div class="w-full flex flex-col justify-center">
      <span
        @click="flip"
        class="pointer text-md text-white font-bold text-center mt-6"
        >Back</span
      >
    </div>
  </div>
  <div>
    <p class="sunset text-center text-white w-20">
      Sunset <strong>{{ sunset }}h</strong>
    </p>
  </div>
</template>

<script>
export default {
  emits: ["flip"],
  methods: {
    flip() {
      this.$emit("flip");
    },
  },
  props: {
    weatherData: Object,
    sunrise: String,
    sunset: String,
  },
};
</script>

<style>
@media (max-width: 600px) {
  .container {
    width: 350px !important;
    height: 350px !important;
    margin-top: 20px !important;
  }
  .wind,
  .humidity,
  .pressure,
  .sunrise,
  .sunset {
    font-size: 0.9rem !important;
  }
}
</style>
