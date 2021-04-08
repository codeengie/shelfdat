<script>
import {Doughnut} from 'vue3-chart-v2';

export default {
    name: "DoughnutChart",
    data() {
        return {
            chartData: {
                labels: ['4K', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384'],
                    data: [151, 172, 14]
                }]
            },
            options: {
                layout: {
                  padding: {
                      top: 15,
                      right: 15,
                      bottom: 15,
                      left: 15
                  }
                },
                legend: {
                    display: false
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