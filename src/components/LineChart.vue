<template>
  <canvas :width="width" :height="height" :id="id"></canvas>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "LineChart",
  props: {
    id: String,
    width: String,
    height: String,
    type: String,
    title: String,
    labels: Array,
    fill: String,
    backgroundColor: String,
    borderColor: String,
    borderWidth: String,
    data: Object,
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    data: {
      handler(newVal, oldVal) {
        console.log("newData=", newVal);
        console.log("oldData=", oldVal);
        console.log("updateChart");
        this.chart.data.datasets[0].data.push(newVal);
        this.chart.update();
      },
      deep: true,
    },
  },
  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");
    this.chart = new Chart(ctx, {
      type: this.type ? this.type : "bar",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.title,
            data: this.data,
            fill: this.fill,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: this.borderWidth ? this.borderWidth : 1,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              id: "newId",
              display: true,
              type: "time",
            },
          ],
          yAxes: [
            {
              display: true,
              type: "linear",
            },
          ],
        },
      },
    });
  },
};
</script>
