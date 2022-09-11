<template>
    <div class="content">
        <h2 class="temp">Dashboard</h2>

        <!-- Media Section -->
        <nas-modwrap :modifier="['foobar', 'bg']">
            <template #heading>Media</template>
            <template #default v-if="donutData">
                <div class="doughnut">
                    <div class="stat stat--flip">
                        <h3 class="stat__title">Total</h3>
                        <h4 class="stat__reading">{{ inventoryTotal }}</h4>
                    </div>
                    <nas-doughnut-chart
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
    </div>
    <nas-sheet></nas-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    data() {
        return {
            donutData: { foobar: 11 },
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
    mounted() {
        // Create donut...YUM!
        // @todo Debug random donut not appearing after load
        // this.createDonut();
    },
    created() {
        this.getInventory();
    },
    computed: {
        ...mapGetters([
            'inventoryData',
            'inventoryTotal',
            'loadStatus'
        ]),
    },
    methods: {
        ...mapActions(['getInventory']),
        countMedia(filterBy, filterKey) {
            return this.inventoryData.filter(data => {
                return (data[filterBy] === filterKey);
            }).length;
        },
        createDonut() {
            this.donutData = {
                labels: ['4k', 'Blu-ray', 'DVD'],
                datasets: [{
                    backgroundColor: ['#36a2eb', '#feb914', '#ff6384'],
                    data: [this.countMedia('format', '4K Blu-ray'), this.countMedia('format', 'Blu-ray'), this.countMedia('format', 'DVD')]
                }]
            };
        }
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
}

// @todo Remove once component is materialized
.temp {
    font: {
        size: 1.6rem;
        weight: 500;
    }
    margin-top: 15px;
    padding: 0 15px;
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