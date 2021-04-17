<template>
    <nas-header></nas-header>
    <router-view></router-view>
    <div class="content">

        <!-- Remove this -->
        <h2 class="temp">Dashboard</h2>

        <!-- Media Section -->
        <nas-modwrap :modifier="['foobar', 'bg']">
            <template #heading>Media</template>
            <template #default v-if="mediaDbData">
                <div class="doughnut">
                    <div class="stat stat--flip">
                        <h3 class="stat__title">Total</h3>
                        <h4 class="stat__reading">334</h4>
                    </div>
                    <nas-doughnut-chart></nas-doughnut-chart>
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

        <!-- Redo this component to use Dynamic Props 93-->
        <section>
            <div v-if="isLoading">
                <nas-skeleton
                    v-for="skeleton in skeletons"
                    :key="skeleton"></nas-skeleton>
            </div>

            <nas-modwrap modifier="grid">
                <template #default v-if="mediaDbData">
                    <nas-inventory
                        v-for="media in mediaSearch"
                        :key="media.id"
                        :type="media.type"
                        :format="media.format"
                        :title="media.title"
                        :location="media.location"></nas-inventory>
                </template>
            </nas-modwrap>
        </section>
    </div>
    <nas-footer></nas-footer>
</template>

<script>
export default {
    data() {
        return {
            isLoading: true,
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
    beforeMount() {
        this.getMedia()
    },
    computed: {
        mediaSearch() {
            return this.mediaDbData.filter(media => {
                return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
            });
        }
    },
    methods: {
        async getMedia() {
            const response = await fetch(process.env.VUE_APP_API_URL);
            const media = await response.json();
            this.mediaDbData = media.data;
            this.isLoading = false;
        },
        updateMedia(mediaRecord) {
            // this.mediaDbData.push(mediaRecord);
            console.log(`Added latest media record: ${mediaRecord}`);
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Roboto:wght@300;400;500;700;900&display=swap');

:root {
    // Color scheme
    --alabaster: #f9f9f9;
    --black: #000000;
    --golden-tainoi: #feb914;
    --picton-blue: #36a2eb;
    --white: #ffffff;
    --wild-watermelon: #ff6384;

    // Site wide
    --bg-color: var(--alabaster);
    --weight-light: 300;
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-bold: 700;
    --weight-xbold: 900;
}

*,
*::after,
*::before {
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body, button, dl, h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
}

body {
    background-color: #fff;
    font-family: Roboto, sans-serif;
}

button {
    border-style: none;
    cursor: pointer;
}

h1 {
    font-size: 3rem;
}

dl, p {
    font-size: 1.6rem;
}

dt {
    font-weight: 500;
}

section {
    padding: 0 15px;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

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
    position: relative;

    canvas {
        height: 146px;
        width: 146px;
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