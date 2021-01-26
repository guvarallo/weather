<template>
  <h1 class="text-center text-gray-900 text-5xl mt-3">Weather</h1>
  <div class="flex justify-center mt-8">
    <form
      class="m-4 flex flex-col"
      @submit.prevent="getWeather"
      @keypress="handleKeyPress"
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
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  data() {
    return {
      city: "",
      isLoading: false,
    };
  },
  methods: {
    getWeather() {
      const url = "http://api.openweathermap.org/data/2.5/weather?";
      const key = "7ac325fd18f5ce43cc1cc62f3e3da84f";
      return fetch(`${url}q=${this.city}&appid=${key}`)
        .then(res => res.json())
        .then(data => console.log(data));
    },
    handleKeyPress(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        this.getWeather();
      }
    },
  },
  name: "App",
  // components: {
  //   HelloWorld
  // }
};
</script>
