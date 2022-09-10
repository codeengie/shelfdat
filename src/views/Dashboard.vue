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
                        :db-data="mediaDbData"
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
                        :db-data="mediaDbData"
                        :iconName="stat.iconName"
                        :filter-by="stat.filterBy"
                        :filter-key="stat.filterKey"
                        :modifier="stat.modifier"
                        :title="stat.title"></nas-stat>
                </div>
            </template>
        </nas-modwrap>

        <!-- New Media Form -->
        <nas-newmedia
            media-db-data
            @addLastMedia="updateMedia">
        </nas-newmedia>

        <!-- Search Form -->
        <div class="search">
            <input class="search__box" placeholder="Search media..." v-model.trim="searchKey">
        </div>

        <!-- Redo this component to use Dynamic Props 93 -->
        <section>
            <div v-if="loadStatus">
                <nas-skeleton
                    v-for="skeleton in skeletons"
                    :key="skeleton"></nas-skeleton>
            </div>

            <nas-modwrap modifier="grid">
                <template #default v-if="inventoryData">
                    <nas-inventory
                        v-for="media in mediaSearch"
                        :key="media.id"
                        :id="media.id"
                        :container="media.container"
                        :type="media.type"
                        :format="media.format"
                        :image="media.imageurl"
                        :title="media.title"
                        :location="media.location"
                        :created="media.createdate"
                        :notes="media.notes"
                        @relay-inventory-id="deleteMedia"></nas-inventory>
                </template>
            </nas-modwrap>
        </section>
    </div>
    <nas-sheet></nas-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    data() {
        return {
            donutData: null,
            skeletons: 6,
            mediaDbData: [],
            searchKey: '',
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
    // I was using beforeMount() hook but switched to created() when I added store integration
    created() {
        // this.$store.dispatch('getInventory');
        this.getInventory();
    },
    computed: {
        mediaSearch() {
            return this.inventoryData.filter(media => {
                return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
            });
        },
        ...mapGetters([
            'inventoryData',
            'inventoryTotal',
            'loadStatus'
        ]),
    },
    methods: {
        ...mapActions(['getInventory']),
        countMedia(filterBy, filterKey) {
            return this.mediaDbData.filter(data => {
                return (data[filterBy] === filterKey);
            }).length;
        },
        async deleteMedia(event) {
            if (window.confirm('Do you really want to delete item?')) {
                const response = await fetch(process.env.VUE_APP_API_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'/*,
                        'X-Api-Key' : process.env.VUE_APP_SECRET_KEY*/
                    },
                    body: JSON.stringify(event)
                });

                const data = await response.json();
                console.log(`Server response: ${JSON.stringify(data)}`);
            }
        },
        async getMedia() {
            /* There's probably a better way of setting data for child component/props but for the
             * the time being I'll keep it Mickey Mouse.
             */
            this.donutData = {
              labels: ['4k', 'Blu-ray', 'DVD'],
              datasets: [{
                  backgroundColor: ['#36a2eb', '#feb914', '#ff6384'],
                  data: [this.countMedia('format', '4K Blu-ray'), this.countMedia('format', 'Blu-ray'), this.countMedia('format', 'DVD')]
              }]
            };
        },
        updateMedia(mediaRecord) {
            // this.mediaDbData.push(mediaRecord);
            console.log(`Added latest media record: ${mediaRecord}`);
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

.search {
    margin: 15px 0;
    padding: 0 15px;

    &__box {
        width: 100%;
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