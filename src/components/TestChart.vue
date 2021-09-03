<template>
  <div>
    <canvas :id="id"></canvas>
  </div>
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
  // LinearScale,
  LogarithmicScale,
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
import parseJSON from 'date-fns/parseJSON';
// import format from 'date-fns/format';
import 'chartjs-adapter-date-fns';

export default {
  name: "TempChart",
  components: {
  },
  data() {
    return {
      id: 'test123',
      chart: null,
      data1: [
        {
          x: parseJSON('2021-08-28T13:35:15.57357+02:00'),
          y: 20
        },
        {
          x: parseJSON("2021-08-28T13:35:35.573537+02:00"),
          y: 22
        },
        {
          x: parseJSON("2021-08-28T13:35:36.573537+02:00"),
          y: 23
        }
      ],
      data2: [
        {
          x: parseJSON('2021-08-28T13:35:15.57357+02:00'),
          y: 20
        },
        {
          x: parseJSON("2021-08-28T13:35:35.573537+02:00"),
          y: 21.5
        },
        {
          x: parseJSON("2021-08-28T13:35:36.573537+02:00"),
          y: 20.5
        }
      ],
      data3: [
        {
          x: parseJSON('2021-08-28T13:35:15.57357+02:00'),
          y: 320
        },
        {
          x: parseJSON("2021-08-28T13:35:35.573537+02:00"),
          y: 321.5
        },
        {
          x: parseJSON("2021-08-28T13:35:36.573537+02:00"),
          y: 320.5
        }
      ],


    };
  },
  mounted() {

    let ctx = document.getElementById(this.id).getContext("2d");
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
      // LinearScale,
      LogarithmicScale,
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

    let colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)'
    ];

    this.chart = shallowRef(new Chart(ctx, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: [
          {
            label: "inpot",
            data: this.data1,
            fill: false,
            backgroundColor: colors[0],
            borderColor: colors[0],
            borderWidth: this.borderWidth ? this.borderWidth : 3,
          },
          {
            label: "cabinet",
            data: this.data2,
            borderColor: colors[1],
            backgroundColor: colors[1],
            borderWidth: this.borderWidth ? this.borderWidth : 3,
          },
          {
            label: "flame",
            data: this.data3,
            borderColor: colors[5],
            backgroundColor: colors[5],
            borderWidth: this.borderWidth ? this.borderWidth : 3,
          },
        ],
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
              unit: 'second',
              displayFormats: {
                second: 'HH:mm:ss'
              },
              tooltipFormat: 'HH:mm:ss'
            },
            ticks: {
              callback: function (value, index, values) {
                console.log("value=", value)
                console.log("index=", index)
                console.log("values=", values)
                return value;
              }
            }
          },

          yAxis:
          {
            display: true,
            // type: "linear",
            type: "logarithmic",
            title: {
              display: true,
              text: 'Temp in °C'
            }
          },

        },
      },
    }));

    console.log("chart created")
    let newValue = {
      x: "2021-08-28T13:40:36.573537+02:00",
      y: 24
    }
    this.data1.push(newValue);
    this.chart.update();
    console.log("chart updated")
  },
  created() {
  },
  methods: {

  },
};
</script>
<style>
.small {
  max-width: 1200px;
  margin: 150px auto;
}
</style>
