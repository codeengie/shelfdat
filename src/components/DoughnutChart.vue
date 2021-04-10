<script>
import {Doughnut} from 'vue3-chart-v2';

export default {
    name: "DoughnutChart",
    data() {
        return {
            chartData: {
                labels: ['4K', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#36a2eb', '#feb914', '#ff6384'],
                    data: [153, 173, 14]
                }]
            },
            options: {
                /*animation: {
                  animateScale: true
                },*/
                cutoutPercentage: 65,
                rotation: Math.PI * 1.5,
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