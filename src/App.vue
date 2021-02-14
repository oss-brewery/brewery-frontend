<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <TempChart></TempChart>
  <!-- <reactive-chart></reactive-chart> -->
  <!-- <chart
    width="1000"
    height="300"
    id="chart2"
    type="line"
    title="# of previous Votes"
    :labels="['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']"
    :data="[3, 14, 8, 25, 17, 10]"
    :border-color="'rgba(153, 102, 255, 1)'"
    border-width="2"
    fill="false"
  ></chart> -->
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TempChart from "./components/TempChart.vue";
// import chart from "./components/LineChart";

export default {
  name: "App",
  components: {
    // HelloWorld,
    TempChart,
    // ReactiveChart,
    // chart,
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
