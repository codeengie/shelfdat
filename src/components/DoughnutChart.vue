<template>
    <!-- @todo Review and update props
        @link: https://vue-chartjs.org/guide/#creating-your-first-chart -->
    <Doughnut
        :chart-data="chartData"
        :chart-id="chartId"
        :chart-options="chartOptions"
        :css-classes="wrapClass"
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
        wrapClass: String,
        dataSet: Object
    },
    data() {
        return {
            chartData: this.dataSet,
            chartId: this.chartName,
            chartOptions: {
                borderWidth: 0,
                cutout: 65, // pixels
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
                rotation: 180
            },
            cssClasses: this.wrapClass
        }
    }
}
</script>