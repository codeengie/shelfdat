<template>
    <nas-header></nas-header>
    <div class="content">

        <!-- Remove this -->
        <h2 class="temp">Dashboard</h2>

        <nas-modwrap modifier="flex">
            <template #heading>Media</template>
            <template #default v-if="mediaDbData">
                <nas-stat
                    v-for="stat in stats"
                    :key="stat"
                    :db-data="mediaDbData"
                    :filter-by="stat.filterBy"
                    :filter-key="stat.filterKey"
                    :title="stat.title"></nas-stat>
            </template>
        </nas-modwrap>

        <nas-modwrap>
          <template #default>
            <nas-doughnut-chart></nas-doughnut-chart>
          </template>
        </nas-modwrap>

        <nas-newmedia
            media-db-data
            @addLastMedia="updateMedia">
        </nas-newmedia>

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
                    title: '4K'
                },
                {
                    filterKey: 'Blu-ray',
                    filterBy: 'format',
                    title: 'BRay'
                },
                {
                    filterKey: 'DVD',
                    filterBy: 'format',
                    title: 'DVD'
                },
                {
                    filterKey: 'Movie',
                    filterBy: 'type',
                    title: 'Movies'
                },
                {
                    filterKey: 'TV Show',
                    filterBy: 'type',
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

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

// Temp, remove once component is materialized
.temp {
    font: {
        size: 1.6rem;
        weight: 500;
    }
    margin-top: 15px;
    padding: 0 15px;
}
</style>