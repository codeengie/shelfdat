<template>
    <div class="content dashboard-pg">
        <LineLoader v-if="loadStatus"/>

        <h1 class="content__title">Dashboard</h1>

        <!-- Media Section -->
        <nas-modwrap :modifier="['foobar', 'bg']">
            <template #heading>Media</template>
            <template #default>
                <div class="doughnut">
                    <div class="stat stat--flip">
                        <h3 class="stat__title">Total</h3>
                        <h4 class="stat__reading">{{ inventoryTotal }}</h4>
                    </div>
                    <nas-doughnut-chart
                        :chart-name="donutName"
                        :data-set="donutData"></nas-doughnut-chart>
                </div>
                <div class="media-stats">
                    <nas-stat
                        v-for="stat in stats"
                        :key="stat"
                        :db-data="inventoryData"
                        :filter-by="stat.filterBy"
                        :filter-key="stat.filterKey"
                        :modifier="stat.modifier"
                        :title="stat.title"></nas-stat>
                </div>
            </template>
        </nas-modwrap>
        <nas-modwrap>
            <template #default>
                <div class="sub-stats">
                    <nas-stat
                        v-for="stat in subStats"
                        :key="stat"
                        :db-data="inventoryData"
                        :iconName="stat.iconName"
                        :filter-by="stat.filterBy"
                        :filter-key="stat.filterKey"
                        :modifier="stat.modifier"
                        :title="stat.title"></nas-stat>
                </div>
            </template>
        </nas-modwrap>
        <!-- Display latest inventory items -->
        <LatestItems
            :db-data="inventoryData"
            :display-num="12" />
    </div>
    <!--<nas-sheet></nas-sheet>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LatestItems from '../components/LatestItems';
import LineLoader from '../components/LineLoader';

export default {
    name: 'Dashboard',
    components: {
        LatestItems,
        LineLoader
    },
    data() {
        return {
            donutName: 'pinky-w-sprinkles',
            donutData: {
                labels: ['4K Blu-ray', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#36a2eb', '#feb914', '#ff6384'],
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
.content {
    flex: 1 0 auto;

    &::after {
        content: '\00a0';
        display: block;
        margin-top: 5px;
        height: 0px;
        visibility: hidden;
    }

    &__title {
        font: {
            size: 1.6rem;
            weight: var(--weight-medium);
        }
        margin-top: 18px;
        padding: 0 15px;
    }
}

.dashboard-pg {
    .modwrap {
        margin-top: 16px;
        padding-top: 14px;

        &__title {
            font-size: 1.4rem;
            margin: {
                top: 0;
                bottom: 6px;
            }
            text-transform: uppercase;
        }
    }
}

// More temp stuff
.doughnut {
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;

    canvas {
        height: 146px;
        width: 146px;
    }

    .stat {
        display: flex;
        flex-flow: column-reverse;

        &__reading {
            font-size: 2.4rem;
        }

        &__title {
            font-size: .8rem;
            text-transform: uppercase;
        }

        &--flip {
            position: absolute;
            text-align: center;
        }
    }
}

.media-stats {
    display: flex;
    justify-content: center;
    margin-top: 18px;

    .stat:nth-child(2) {
        margin: 0 30px;
    }
}

.sub-stats {
    display: flex;
    justify-content: center;

    .stat:nth-child(2) {
        margin: 0 0 0 8px;
    }
}

// Disabled for now since I'm focusing on bottom media stats, I'll come back to this
/*.stat:first-of-type {
    left: 50%;
    margin-top: 0 !important;
    padding: 0 !important;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
}*/
</style>