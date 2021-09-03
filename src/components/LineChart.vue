<template>
  <canvas :width="width" :height="height" :id="id"></canvas>
</template>

<script>
import {
  Chart,
  //   ArcElement,
  LineElement,
  //   BarElement,
  PointElement,
  //   BarController,
  //   BubbleController,
  //   DoughnutController,
  LineController,
  //   PieController,
  //   PolarAreaController,
  //   RadarController,
  //   ScatterController,
  CategoryScale,
  LinearScale,
  // LogarithmicScale,
  //   RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  //   Decimation,
  //   Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';

import { shallowRef } from 'vue';
// import { de } from 'date-fns/locale';
// import { formatISO9075 } from 'date-fns/formatISO9075';
// import { parseISO } from 'date-fns/parseISO';
// import parseJSON from 'date-fns/parseJSON';
// import format from 'date-fns/format';
import 'chartjs-adapter-date-fns';

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
    datasets: Object,
  },
  data() {
    return {
      chart: null,
    };
  },

  watch: {
    datasets: {
      handler(newVal) {
        // console.log("newData=", newVal);
        // console.log("oldData=", oldVal);
        // console.log("updateChart");
        this.chart.data.datasets = newVal;
        this.chart.update();
      },
      deep: true,
    },
  },
  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");
    Chart.register(
      //     ArcElement,
      LineElement,
      //     BarElement,
      PointElement,
      //     BarController,
      //     BubbleController,
      //     DoughnutController,
      LineController,
      //     PieController,
      //     PolarAreaController,
      //     RadarController,
      //     ScatterController,
      CategoryScale,
      LinearScale,
      // LogarithmicScale,
      //     RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      //     Decimation,
      //     Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );
    this.chart = shallowRef(new Chart(ctx, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'xAxis'
        },
        plugins: {
          title: {
            display: true,
            text: "Temperatures"
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          xAxis:
          {
            type: "timeseries",
            display: false,
            time: {
              // unit: 'second',
              displayFormats: {
                second: 'HH:mm:ss'
              },
              tooltipFormat: 'HH:mm:ss'
            },
            ticks: {
              // callback: function (value, index, values) {
              //   console.log("value=", value)
              //   console.log("index=", index)
              //   console.log("values=", values)
              //   return value;
              // }
            }
          },

          yAxis:
          {
            display: true,
            type: "linear",
            // type: "logarithmic",
            title: {
              display: true,
              text: 'Temp in °C'
            }
          },

        },
      },
    }));
  },
};
</script>
