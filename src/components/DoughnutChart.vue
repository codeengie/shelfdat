<script>
import { Doughnut } from 'vue3-chart-v2';

export default {
  name: "DoughnutChart",
  data() {
    return {
      chartData: {
        labels: ['4K', 'Blu-ray', 'DVD'],
        datasets: [{
          backgroundColor: ['#41b883', '#e46651', '#00d8ff'],
          data: [150, 172, 14]
        }]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  extends: Doughnut,
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
}
</script>

<style lang="scss" scoped>

</style>