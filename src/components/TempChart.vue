<template>
  <div class="small">
    <div v-if="!loaded"><span>loading...</span></div>
    <line-chart
      v-if="loaded"
      width="1000"
      height="300"
      id="mylineChart"
      type="line"
      title="# of previous Votes"
      :labels="[]"
      :data="controlCabinetAirTemp"
      :border-color="'rgba(153, 102, 255, 1)'"
      border-width="2"
      fill="true"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "TempChart",
  components: {
    LineChart,
  },
  data() {
    return {
      loaded: false,
      connection: null,
      datacollection: {},
      controlCabinetAirTemp: [],
      airTemp: [],
      flameTemp: [],
      inpotBottomTemp: [],
      inpotMiddleTemp: [],
      inpotTopTemp: [],
    };
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8080/brewery/sensors/");
    this.fillData();
    this.getRealtimeData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        //labels: [this.getRandomChartValues(), this.getRandomChartValues()],
        datasets: [
          {
            label: "ControlCabinet Air-Temperature",
            backgroundColor: "#1A73E8",
            data: this.controlCabinetAirTemp,
          },
          // {
          //   label: "Air-Temperature",
          //   backgroundColor: "#2b7518",
          //   data: this.airTemp,
          // },
        ],
      };
    },
    getRealtimeData() {
      this.connection.onopen = function(event) {
        console.log(event);
        console.log("Successfully connected to the echo websocket server...");
        this.loaded = true;
      }.bind(this);

      this.connection.onmessage = function(event) {
        var jsonObj = JSON.parse(event.data);
        if (jsonObj.messageType === "UPDATING_SENSOR_DATA") {
          var body = JSON.parse(jsonObj.body);
          jsonObj.body = body;
          this.appendControlCabinetAirTemps(body.controlCabinetTemperature);
          this.loaded = true;
          // this.fillData(jsonObj);
        }
      }.bind(this);
    },
    appendControlCabinetAirTemps(cCTemp) {
      console.log("cCTemp :", this.datacollection.datasets[0].data);

      this.controlCabinetAirTemp.push({
        x: cCTemp.timestamp,
        y: cCTemp.airTemp,
      });

      // this.datacollection.datasets[1].data.push({
      //   x: cCTemp.timestamp,
      //   y: cCTemp.controlCabinetAirTemp,
      // });
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
