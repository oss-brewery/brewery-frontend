<template>
  <div class="small">
    <div v-if="!loaded"><span>loading...</span></div>
    <line-chart
      v-if="loaded"
      :chart-data="datacollection"
      id="mychart"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.js";
// import io from "socket.io-client";
// var socket = io.connect("ws://localhost:8080/brewery/sensors/");

export default {
  name: "TempChart",
  components: {
    LineChart,
  },
  data() {
    return {
      loaded: false,
      connection: null,
      datacollection: null,
    };
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    // this.connection = new WebSocket("ws://localhost:8080/brewery/sensors/");

    // this.getRealtimeData();
    this.fillData(1);
  },
  methods: {
    fillData(fetchedData) {
      console.log("fetchData=", fetchedData);
      this.datacollection = {
        labels: [this.getRandomChartValues(), this.getRandomChartValues()],
        datasets: [
          {
            label: "Google Stock",
            backgroundColor: "#1A73E8",
            data: [this.getRandomChartValues(), this.getRandomChartValues()],
          },
          {
            label: "Microsoft Stock",
            backgroundColor: "#2b7518",
            data: [this.getRandomChartValues(), this.getRandomChartValues()],
          },
        ],
      };
      this.loaded = true;
    },
    getRealtimeData() {
      //   socket.on("newdata", (fetchedData) => {
      //     this.fillData(fetchedData);
      //   });

      //   this.connection.onmessage = function(event) {
      //     var jsonObj = JSON.parse(event.data);
      //     if (jsonObj.messageType === "UPDATING_SENSOR_DATA") {
      //       console.log("values are updated", jsonObj);
      //     }
      //   };

      this.connection.onmessage = function(event) {
        var jsonObj = JSON.parse(event.data);
        if (jsonObj.messageType === "UPDATING_SENSOR_DATA") {
          console.log("values are updated", jsonObj);
          this.fillData(jsonObj);
        }
      }.bind(this);

      this.connection.onopen = function(event) {
        console.log(event);
        console.log("Successfully connected to the echo websocket server...");
      };
    },
    getRandomChartValues() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
