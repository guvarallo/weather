<template>
  <div class="flex flex-col items-center">
    <p class="max text-center text-white w-20">
      Min
    </p>
    <p>
      <strong
        >{{ Math.round(weatherData.daily[0].temp.min - 273.15) }}°C</strong
      >
    </p>
  </div>
  <div class="container flex flex-col justify-evenly w-ball h-ball">
    <div>
      <p class="city text-5xl text-white px-5 mb-3 text-center">
        {{ city }}
      </p>
      <p class="time text-lg text-white px-5 text-center">
        Local time now: <strong>{{ localTime }}h</strong>
      </p>
    </div>
    <div class="flex flex-col items-center justify-center">
      <p class="temp text-5xl text-white text-center">
        {{ Math.round(weatherData.current.temp - 273.15) }}°C
      </p>
      <div class="flex justify-center items-center">
        <img
          :src="iconUrl"
          alt="weather icon"
          class="icon text-white text-center"
        />
        <p class="condition text-2xl text-white text-center">
          {{ weatherData.current.weather[0].main }}
        </p>
      </div>
      <p class="feels text-lg text-white text-center mt-1">
        Feels like
        <strong
          >{{ Math.round(weatherData.current.feels_like - 273.15) }}°C</strong
        >
      </p>
    </div>
    <div class="more-info w-full flex flex-col justify-center">
      <span
        @click="flip"
        class="more-info pointer text-md text-white font-bold text-center mt-6 mb-7"
        >Click here for more info</span
      >
    </div>
  </div>
  <div class="flex flex-col items-center">
    <p class="max text-center text-white w-20">
      Max
    </p>
    <p>
      <strong
        >{{ Math.round(weatherData.daily[0].temp.max - 273.15) }}°C</strong
      >
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
    city: String,
    localTime: String,
    iconUrl: String,
  },
};
</script>

<style>
@media (max-width: 600px) {
  .container {
    width: 350px !important;
    height: 350px !important;
  }
  .city,
  .temp {
    font-size: 1.8rem !important;
  }
  .time,
  .condition,
  .feels,
  .min,
  .max,
  .more-info {
    font-size: 0.9rem !important;
  }
}
</style>
