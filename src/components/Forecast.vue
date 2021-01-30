<template>
  <div
    v-if="daily.length !== 0 && !isLoading"
    class="min-w-screen flex items-center justify-center px-5 py-5 mt-14"
  >
    <div
      class="w-full mx-auto rounded-lg bg-gradient-to-b from-purple-600 to-blue-600 shadow-lg px-5 pt-5 pb-10 text-white"
    >
      <p class="text-4xl text-white px-5 mb-8">Next 7 Days</p>
      <div class="grid grid-cols-7 text-center">
        <div
          v-for="data in daily"
          :key="data.dt"
          class="flex flex-col items-center justify-evenly m-2 bg-white text-gray-600 rounded-lg"
          style="height: 200px;"
        >
          <div>
            <p class="temp text-xl text-gray-600 text-center">
              {{
                new Date(data.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            </p>
            <p class="temp text-md text-gray-600 text-center">
              {{
                new Date(data.dt * 1000).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "numeric",
                })
              }}
            </p>
          </div>
          <p class="temp text-2xl text-gray-600 text-center mt-3">
            {{ Math.round(data.temp.day - 273.15) }}°C
          </p>
          <div>
            <img
              :src="getIcon(data.weather[0].icon)"
              alt="weather icon"
              class="icon text-white text-center"
            />
            <p class="temp text-sm text-gray-600 text-center">
              {{ data.weather[0].main }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: Object,
    isLoading: Boolean,
    daily: Array,
  },
  methods: {
    getIcon(icon) {
      return `http://openweathermap.org/img/w/${icon}.png`;
    },
  },
};
</script>
