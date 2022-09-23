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
            <!-- @todo Use a loop -->
            <!-- @todo Change class name to 'legend' and rename ChatStat component -->
            <div class="segments">
                <ChartStat
                    :stat-mods="['icon']"
                    :stat-num="donutSegmentData[0]"
                    stat-icon-color="#007aaf"
                    stat-label="4K"/>
                <ChartStat
                    :stat-mods="['icon']"
                    :stat-num="donutSegmentData[1]"
                    stat-icon-color="#a24a59"
                    stat-label="BRAY"/>
                <ChartStat
                    :stat-mods="['icon']"
                    :stat-num="donutSegmentData[2]"
                    stat-icon-color="#a27c4a"
                    stat-label="DVD"/>
            </div>

            <!-- Total inventory count by category -->
            <div class="category">
                <ChartStat
                    stat-num="740"
                    stat-label="Movies"/>
                <ChartStat
                    stat-num="68"
                    stat-label="TV Shows"/>
            </div>
        </div>

        <!-- Media Section -->
        <!--<nas-modwrap :modifier="['foobar', 'bg']">
            <template #heading>Media</template>
            <template #default>
                <div class="doughnut">
                    <div class="stat stat--flip">
                        <h3 class="stat__title">Total</h3>
                        <h4 class="stat__reading">{{ inventoryTotal }}</h4>
                    </div>
                </div>
                <div class="media-stats">
                    <Stat
                        v-for="stat in stats"
                        :key="stat"
                        :db-data="inventoryData"
                        :filter-by="stat.filterBy"
                        :filter-key="stat.filterKey"
                        :modifier="stat.modifier"
                        :title="stat.title"/>
                </div>
            </template>
        </nas-modwrap>-->
        <!--<nas-modwrap>
            <template #default>
                <div class="sub-stats">
                    <Stat
                        v-for="stat in subStats"
                        :key="stat"
                        :db-data="inventoryData"
                        :iconName="stat.iconName"
                        :filter-by="stat.filterBy"
                        :filter-key="stat.filterKey"
                        :modifier="stat.modifier"
                        :title="stat.title"/>
                </div>
            </template>
        </nas-modwrap>-->
        <!-- Display latest inventory items -->
        <LatestItems
            :db-data="inventoryData"
            :display-num="12"/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ChartStat from '../components/ChartStat';
import DoughnutChart from '../components/DoughnutChart';
import LatestItems from '../components/LatestItems';
import LineLoader from '../components/LineLoader';
//import Stat from '../components/Stat';

export default {
    name: 'Dashboard',
    components: {
        ChartStat,
        DoughnutChart,
        LatestItems,
        LineLoader//,
        //Stat
    },
    data() {
        return {
            donutName: 'pinky-w-sprinkles',
            donutData: {
                labels: ['4K Blu-ray', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#007aaf', '#a27c4a', '#a24a59'],
                    data: []
                }]
            },
            stats: [
                {
                    filterKey: '4K Blu-ray',
                    filterBy: 'format',
                    modifier: 'picton',
                    title: '4K'
                },
                {
                    filterKey: 'Blu-ray',
                    filterBy: 'format',
                    modifier: 'golden',
                    title: 'BRay'
                },
                {
                    filterKey: 'DVD',
                    filterBy: 'format',
                    modifier: 'wild',
                    title: 'DVD'
                }
            ],
            subStats: [
                {
                    filterKey: 'Movie',
                    filterBy: 'type',
                    iconName: 'movie.svg',
                    modifier: 'icon',
                    title: 'Movies'
                },
                {
                    filterKey: 'TV Show',
                    filterBy: 'type',
                    iconName: 'tv.svg',
                    modifier: 'icon',
                    title: 'TV Shows'
                }
            ]
        };
    },
    created() {
        this.getInventory();
    },
    async mounted() {
        try {
            await this.getInventory();
            this.donutData.datasets[0].data = this.donutSegmentData;
        } catch (err) {
            console.error(err);
            throw err;
        }
    },
    computed: {
        ...mapGetters([
            'donutSegmentData',
            'inventoryData',
            'inventoryTotal',
            'loadStatus'
        ]),
    },
    methods: {
        ...mapActions(['getInventory']),
        // @todo Remove, you refactored this code and combined it in the store
        /*createDonutData(prop) {
            this.donutData.labels.forEach(label => {
                console.log(label);
                this.donutData.datasets[0].data.push(this.inventoryCount(prop, label));
            });
        },
        inventoryCount(filterBy, filterKey) {
            let count = this.inventoryData.filter(item => item[filterBy] === filterKey).length;
            console.log(count);
            return count;
        }*/
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
            margin-top: 12px;
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
    margin-top: 28px;
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

.donut {
    align-items: center;
    background-color: var(--dark-shark);
    display: flex;
    flex-direction: column;
    height: 410px;
    padding-top: 32px;

    &__constrain {
        height: 180px;
        width: 180px;
    }

    &__title {
        color: var(--white);
        font: {
            size: 2.2rem;
            weight: var(--weight-medium);
        }
    }

    &__wrap {
        margin-top: 26px;
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

.segments {
    display: flex;
    margin-top: 26px;

    .chart-stat {
        &:nth-child(even) {
            margin: 0 32px;
        }
    }
}
</style>