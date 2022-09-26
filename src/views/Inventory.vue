<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} - Media</h1>

        <!-- Search Inventory -->
        <Search
            placeholder-text="search"
            v-model="searchInput"/>

        <!-- Filters -->
        <div class="filters">
            <FilterButton
                v-for="filterLabel in filterLabels"
                :key="filterLabel"
                :button-name="filterLabel"/>
        </div>

        <!-- Inventory -->
        <div class="inventory">
            <Poster
                v-for="media in mediaSearch"
                :key="media.id"
                :poster-id="media.id"
                poster-height="162"
                :poster-title="media.title"
                poster-width="108"
                :poster-src="media.imageurl"/>
        </div>

        <!-- Redo this component to use Dynamic Props 93 -->
        <!--<section>
            <nas-modwrap modifier="grid">
                <template #default v-if="inventoryData">
                    <Items
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
                        @relay-inventory-id="deleteMedia"/>
                </template>
            </nas-modwrap>
        </section>-->
    </div>
    <Details/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FilterButton from '../components/FilterButton';
//import Items from '../components/Items';
import Search from '../components/Search';
import Poster from '../components/Poster';
import Details from '../components/Details';

export default {
    name: 'Inventory',
    components: {
        Details,
        Poster,
        FilterButton,
        //Items,
        Search
    },
    data() {
        return {
            filterLabels: ['All', '4K', 'BRAY', 'DVD'],
            pageTitle: this.$route.meta.title,
            searchInput: ''
        }
    },
    created() {
        this.getInventory();
    },
    computed: {
        ...mapGetters(['inventoryData', 'loadStatus']),
        mediaSearch() {
            return this.inventoryData.filter(media => {
                return media.title.toLowerCase().includes(this.searchInput.toLowerCase());
            });
        }
    },
    methods: {
        ...mapActions(['getInventory']),
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
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 0 var(--block-spacing);

    &__title {
        color: var(--secondary-text-color);
        font: {
            size: var(--primary-text-size);
            weight: var(--weight-medium);
        }
        margin-top: 32px;
    }
}

.filters {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(4, 60px);
    margin-top: 16px;
}

.inventory {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, 108px);
    grid-auto-rows: 162px;
    margin-top: 40px;
}

.search {
    margin-top: 18px;
}
</style>