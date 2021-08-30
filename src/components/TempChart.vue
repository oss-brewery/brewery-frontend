<template>
  <div>
    <div v-if="!loaded"><span>loading...</span></div>
    <line-chart
      v-if="loaded"
      width="1000"
      height="300"
      id="mylineChart"
      title="# of previous Votes"
      :labels="['ControlCabinet Air-Temperature']"
      :datasets="datasets"
      :border-color="'rgba(153, 102, 255, 1)'"
      border-width="2"
      fill="false"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import parseJSON from 'date-fns/parseJSON';

let colors = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)'
];


export default {
  name: "TempChart",
  components: {
    LineChart,
  },
  data() {
    return {
      loaded: false,
      connection: null,

      airTemp: [],
      controlCabinetTemp: [],
      inpotBottomTemp: [],
      inpotMiddleTemp: [],
      inpotTopTemp: [],
      flameTemp: [],
      datasets: [
        {
          label: "inpot bottom",
          data: [],
          fill: false,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
        {
          label: "inpot middle",
          data: [],
          fill: false,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
        {
          label: "inpot top",
          data: [],
          fill: false,
          backgroundColor: colors[0],
          borderColor: colors[0],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
        {
          label: "cabinet",
          data: [],
          borderColor: colors[1],
          backgroundColor: colors[1],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
        {
          label: "air",
          data: [],
          borderColor: colors[1],
          backgroundColor: colors[1],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
        {
          label: "flame",
          data: [],
          borderColor: colors[5],
          backgroundColor: colors[5],
          borderWidth: this.borderWidth ? this.borderWidth : 3,
        },
      ],

    };
  },
  created() {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8080/brewery/sensors/");
    this.getRealtimeData();
  },
  methods: {

    getRealtimeData() {
      this.connection.onopen = function (event) {
        console.log(event);
        console.log("Successfully connected to the echo websocket server...");
        this.loaded = true;
      }.bind(this);

      this.connection.onmessage = function (event) {
        var jsonObj = JSON.parse(event.data);
        if (jsonObj.messageType === "UPDATING_SENSOR_DATA") {
          var body = JSON.parse(jsonObj.body);
          jsonObj.body = body;
          this.buildChartEntries(body);
          this.loaded = true;
        }
      }.bind(this);
    },
    buildChartEntries(wsbody) {
      console.log("wsbody :", wsbody);

      // air temp
      let controlCabinetTempObj = wsbody.controlCabinetTemperature;
      let airTempEntry = {
        x: parseJSON(controlCabinetTempObj.timestamp),
        y: controlCabinetTempObj.airTemp
      };
      this.airTemp.push(airTempEntry)

      // controlcabinet temps
      let controlCabinetAirTempEntry = {
        x: parseJSON(controlCabinetTempObj.timestamp),
        y: controlCabinetTempObj.controlCabinetAirTemp
      };
      this.controlCabinetTemp.push(controlCabinetAirTempEntry);

      //flame temp
      let flameTempDataObj = wsbody.flameTemperature;
      let flameTempEntry = {
        x: parseJSON(flameTempDataObj.timestamp),
        y: flameTempDataObj.temperature
      };
      this.flameTemp.push(flameTempEntry)

      //inpot temps
      //bottom
      let inpotTempDataObj = wsbody.inpotTemperature
      let bottomTempEntry = {
        x: parseJSON(inpotTempDataObj.timestamp),
        y: inpotTempDataObj.bottom
      };
      this.inpotBottomTemp.push(bottomTempEntry)

      //middle
      let middleTempEntry = {
        x: parseJSON(inpotTempDataObj.timestamp),
        y: inpotTempDataObj.middle
      };
      this.inpotMiddleTemp.push(middleTempEntry)

      //top
      let topTempEntry = {
        x: parseJSON(inpotTempDataObj.timestamp),
        y: inpotTempDataObj.top
      };
      this.inpotTopTemp.push(topTempEntry)

      // updating dataset

      this.datasets[0].data = this.inpotBottomTemp
      this.datasets[1].data = this.inpotMiddleTemp
      this.datasets[2].data = this.inpotTopTemp
      this.datasets[3].data = this.controlCabinetTemp
      this.datasets[4].data = this.airTemp
      this.datasets[5].data = this.flameTemp

      // console.log("cCTemp :", this.datacollection.datasets[0].data);

      // this.datacollection.datasets[0].data.push({
      //   x: cCTemp.timestamp,
      //   y: cCTemp.controlCabinetAirTemp,
      // });

      // return {
      //   x: cCTemp.timestamp,
      //   y: cCTemp.controlCabinetAirTemp,
      // };
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
