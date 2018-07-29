<template lang="pug">
  div
    canvas(ref="canvas")
</template>
<script>
import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted() {
    this.renderGraph()
  },
  methods: {
    renderGraph() {
      this.renderChart({
        labels:['January', 'February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [
          {
            label: 'Gross revenue',
            backgroundColor: '#9bc03c',
            data: [10,15,5,20,13,5,7,9,22,55,7,10]
          }
        ]
      })
    }
  }
}
</script>
