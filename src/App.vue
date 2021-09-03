<template>
  <TempChart></TempChart>
  <!-- <TestChart></TestChart> -->
</template>

<script>
import TempChart from "./components/TempChart.vue";
// import TestChart from "./components/TestChart.vue";

export default {
  name: "App",
  components: {
    TempChart,
    // TestChart
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
