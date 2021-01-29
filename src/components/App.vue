<template>
  <Header />
  <Search />
</template>

<script>
import Header from "./Header";
import Search from "./Search";

export default {
  name: "App",
  components: {
    Header,
    Search,
  },
};
</script>
