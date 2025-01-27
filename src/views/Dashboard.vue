<template>
    <div class="content">
        <!-- @todo This will work better if placed in App.vue rather than adding it on each page/component -->
        <LineLoader v-if="loadStatus"/>

        <!-- Donut chart -->
        <div class="donut">
            <h1 class="donut__title">Media</h1>
            <div class="donut__wrap">
                <DoughnutChart
                    :chart-name="donutName"
                    :data-set="donutData"
                    css-classes="donut__constrain"/>
                <ChartStat
                    :stat-num="inventoryTotal"
                    stat-label="Total"/>
            </div>

            <!-- Donut legend with counts -->
            <!-- @todo Change class name to 'legend' and rename ChatStat component -->
            <div class="segments">
                <ChartStat
                    v-for="(segment, index) in donutSegmentData"
                    :key="segment"
                    :stat-mods="['icon']"
                    :stat-num="donutSegmentData[index]"
                    :stat-icon-color="donutData.datasets[0].backgroundColor[index]"
                    :stat-label="donutData.labels[index]"/>
            </div>

            <!-- Total inventory by category -->
            <div class="category">
                <ChartStat
                    v-for="(legend, index) in donutLegendData"
                    :key="legend"
                    :stat-num="donutLegendData[index]"
                    :stat-label="donutTypes[index]"/>
            </div>
        </div>
        <!-- Display recent inventory items -->
        <Recent
            v-if="inventoryData.length"
            :db-data="inventoryData"
            :display-num="10"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChartStat from '../components/ChartStat';
import DoughnutChart from '../components/DoughnutChart';
import LineLoader from '../components/LineLoader';
import Recent from '../components/Recent';

export default {
    name: 'Dashboard',
    components: {
        ChartStat,
        DoughnutChart,
        LineLoader,
        Recent
    },
    data() {
        return {
            // Consolidate all this donut data while keeping in mind it doesn't break
            donutName: 'pinky-w-sprinkles',
            donutData: {
                labels: ['4K', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#007aaf', '#a27c4a', '#a24a59'],
                    data: []
                }]
            },
            donutTypes: ['Movies', 'TV Shows']
        };
    },
    async created() {
        await this.getInventory();
        this.donutData.datasets[0].data = this.donutSegmentData;
    },
    async mounted() {
        //await this.getInventory();
        //this.donutData.datasets[0].data = this.donutSegmentData;
    },
    computed: {
        ...mapGetters([
            'donutLegendData',
            'donutSegmentData',
            'inventoryData',
            'inventoryTotal',
            'loadStatus'
        ]),
    },
    methods: {
        ...mapActions(['getInventory'])
    }
}
</script>

<style lang="scss">
.category {
    .chart-stat {
        &__label {
            margin: 0 0 12px;
        }

        &__number {
            font: {
                size: 2.6rem;
                weight: var(--weight-medium);
            }
        }
    }
}

.segments {
    .chart-stat {
        &__label {
            font-size: 1.6rem;
            margin-top: 16px;
        }

        &__number {
            font: {
                size: 2.6rem;
                weight: var(--weight-medium);
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.category {
    background-color: var(--primary-bg-color);
    display: flex;
    margin-top: 23px;
    padding: 8px;

    .chart-stat {
        background-color: var(--dark-shark);
        flex-flow: column-reverse;
        height: 74px;
        width: 128px;

        &:nth-child(even) {
            margin-left: 4px;
        }

        &:nth-child(odd) {
            margin-right: 4px;
        }
    }
}

.content {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    position: relative;
}

.donut {
    align-items: center;
    background-color: var(--dark-shark);
    display: flex;
    flex-direction: column;
    height: 410px;
    margin-bottom: 48px; // Addresses the offset of the categories
    padding-top: 35px;

    &__constrain {
        height: 180px;
        width: 180px;
    }

    &__title {
        color: var(--secondary-text-color);
        font: {
            size: var(--primary-text-size);
            weight: var(--weight-medium);
        }
    }

    &__wrap {
        margin-top: 22px;
        position: relative;

        .chart-stat {
            bottom: 0;
            left: 0;
            margin: auto;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}

.recent {
    margin-top: 25px;
}

.segments {
    display: flex;
    margin-top: 25px;

    .chart-stat {
        &:nth-child(even) {
            margin: 0 32px;
        }
    }
}
</style>