<template>
  <div
    v-if="Object.keys(weatherData).length !== 0 && !isLoading"
    class="min-w-screen flex items-center justify-center px-5 py-5 mt-14"
  >
    <div
      class="w-full mx-auto rounded-lg bg-gradient-to-b from-purple-600 to-blue-600 shadow-lg px-5 pt-5 pb-10 text-white"
    >
      <p class="text-4xl text-white px-5 mb-8">Next 7 Days</p>
      <div class="grid grid-cols-7 text-center">
        <div class="bg-white text-gray-600 rounded-lg">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: Object,
  },
};
</script>
