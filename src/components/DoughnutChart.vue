<template>
    <Doughnut
        :chart-data="chartData"
        :chart-id="chartId"
        :chart-options="chartOptions"
    />
</template>

<script>
import { Doughnut } from 'vue-chartjs';
// @todo Remove unnecessary module objects
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
        chartName: String,
        dataSet: Object
    },
    data() {
        return {
            chartData: this.dataSet,
            chartId: this.chartName,
            chartOptions: {
                cutout: 50,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                responsive: true,
                rotation: Math.PI * 1.5
            }
        }
    }
}
</script>