<template>
  <h1 class="text-center text-gray-900 text-5xl mt-3">Weather</h1>
  <Search />
</template>

<script>
import Search from "./Search";

export default {
  name: "App",
  components: {
    Search,
  },
};
</script>
