<template>
  <div
    v-if="Object.keys(weatherData).length !== 0 && !isLoading"
    class="min-w-screen m-auto scene"
  >
    <div class="circle">
      <div
        class="circle_face flex items-center mx-auto rounded-full bg-gradient-to-b from-purple-600 to-blue-600 shadow-lg w-ball h-ball text-white p-2"
      >
        <WeatherCircleFront
          @flip="isFlipped"
          :weatherData="weatherData"
          :city="city"
          :localTime="localTime"
          :iconUrl="iconUrl"
        />
      </div>
      <div
        class="circle_face circle_back flex items-center mx-auto rounded-full bg-gradient-to-b from-blue-600 to-purple-600 shadow-lg w-ball h-ball text-white p-2"
      >
        <WeatherCircleBack
          @flip="isFlipped"
          :weatherData="weatherData"
          :sunrise="sunrise"
          :sunset="sunset"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeatherCircleFront from "./WeatherCircleFront";
import WeatherCircleBack from "./WeatherCircleBack";

export default {
  components: {
    WeatherCircleFront,
    WeatherCircleBack,
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
  methods: {
    isFlipped() {
      const circle = document.querySelector(".circle");
      circle.classList.toggle("is-flipped");
    },
  },
};
</script>

<style>
.scene {
  width: 500px;
  height: 500px;
  perspective: 1000px;
}
.circle {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.circle_face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.circle_back {
  transform: rotateY(180deg);
}

.circle.is-flipped {
  transform: rotateY(180deg);
}

@media (max-width: 600px) {
  .scene {
    width: 350px;
    height: 350px;
    perspective: 700px;
  }
  .circle_face {
    width: 350px !important;
    height: 350px !important;
  }
}
</style>
