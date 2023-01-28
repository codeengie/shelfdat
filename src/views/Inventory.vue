<template>
    <LineLoader v-if="loadStatus"/>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }}</h1>

        <!-- Search Inventory -->
        <Search
            :search-data="inventoryData"
            placeholder-text="search"
            @searched-inventory="setFilteredData"/>

        <!-- Filters -->
        <div class="filters">
            <FilterButton
                v-for="(filter, index) in filters.labels"
                :key="filter"
                :button-name="filter"
                :category="filters.categories[index]"
                :class="{ 'filter__button--active': index === 0 }"
                :filter-data="inventoryData"
                :keyword="filters.keywords[index]"
                @filtered-inventory="setFilteredData"/>
        </div>

        <!-- Inventory -->
        <div class="inventory">
            <Poster
                v-for="inventory in filteredInventoryData"
                :key="inventory.id"
                class="poster--hover"
                :poster-id="inventory.id"
                poster-height="162"
                :poster-title="inventory.title"
                poster-width="108"
                :poster-src="inventory.imageurl"
                :poster-year="inventory.year"
                @broadcast-id="showDetails"/>
        </div>
    </div>
    <Details
        :collection="details.collection"
        :container="details.container"
        :createdate="details.createdate"
        :format="details.format"
        :imageurl="details.imageurl"
        :location="details.location"
        :notes="details.notes"
        :title="details.title"
        :type="details.type"
        :year="details.year"
        ref="details"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import FilterButton from '../components/FilterButton';
import LineLoader from '../components/LineLoader';
import Poster from '../components/Poster';
import Search from '../components/Search';

// Let's be lazy
const Details = defineAsyncComponent(() => import('../components/Details'));

export default {
    name: 'Inventory',
    components: {
        Details,
        FilterButton,
        LineLoader,
        Poster,
        Search
    },
    data() {
        return {
            filters: {
                categories: ['', 'format', 'format', 'format', 'type', 'type'],
                keywords: ['', '4K Blu-ray', 'Blu-ray', 'DVD', 'Movie', 'TV'],
                labels: ['All', '4K', 'BRAY', 'DVD', 'Movie', 'TV'],
            },
            pageTitle: this.$route.meta.title,
            details: this.initialState(),
            filteredInventoryData: null
        }
    },
    async created() {
        await this.getInventory();
        this.filteredInventoryData = this.inventoryData;
    },
    computed: {
        ...mapGetters(['inventoryData', 'loadStatus']),
    },
    methods: {
        ...mapActions(['getInventory']),
        // Use the emitted inventory data and set it to initial prop
        setFilteredData(event) {
            this.filteredInventoryData = event;
        },
        // Save and set the initial state of details data
        initialState() {
            return {
                container: 0,
                collection: false,
                createdate: '',
                format: '',
                imageurl: '',
                location: '',
                notes: '',
                title: '',
                type: '',
                year: 0
            };
        },
        // Use the emitted UID to find specific inventory item and display it in the details
        showDetails(event) {
            // Reset details data
            Object.assign(this.$data.details, this.initialState());

            const found = this.inventoryData.find(element => element.id === event);

            // Iterate through `found` and set the new data for `details` object
            Object.entries(found).forEach(([key, value]) => {
               for (const detail in this.details) {
                   if (detail === key) {
                       this.details[detail] = value;
                   }
               }
            });

            this.$refs.details.toggleDialog();
        },
        async deleteMedia(event) {
            if (window.confirm('Do you really want to delete item?')) {
                const response = await fetch(process.env.VUE_APP_API_URL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
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
    padding: 35px var(--block-spacing) 24px;

    &__title {
        color: var(--secondary-text-color);
        font: {
            size: var(--primary-text-size);
            weight: var(--weight-medium);
        }
    }
}

.filters {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr) calc(100vw - 50rem);
    margin-top: 16px;
}

.inventory {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    margin-top: 40px;

    // Using the latest hotness, unfortunately neither desktop or mobile/tablet Safari supports it
    @media (width >= 768px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
}

.search {
    margin-top: 22px;
}
</style>