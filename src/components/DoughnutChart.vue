<template>
    <Doughnut
        :chart-data="chartData"
        :chart-id="chartId"
        :chart-options="chartOptions"
    />
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
    name: 'DoughnutChart',
    components: { Doughnut },
    props: {
      dataSet: Object
    },
    data() {
        return {
            chartData: {
                labels: ['4k', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#36a2eb', '#feb914', '#ff6384'],
                    data: [40, 20, 80]
                }]
            },
            chartId: 'invtotal',
            chartOptions: {
                cutout: 35,
                hoverOffset: 4,
                layout: {
                    padding: 15
                },
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                },
                responsive: true,
                rotation: Math.PI * 1.5
            }
        }
    }
}
</script>