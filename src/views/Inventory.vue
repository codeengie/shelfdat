<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} - Media</h1>

        <!-- Search Inventory -->
        <Search
            :search-data="inventoryData"
            placeholder-text="search"
            @searched-inventory="setFilteredData"/>

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
                v-for="inventory in filteredInventoryData"
                :key="inventory.id"
                :poster-id="inventory.id"
                poster-height="162"
                :poster-title="inventory.title"
                poster-width="108"
                :poster-src="inventory.imageurl"
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
        ref="details"/>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import FilterButton from '../components/FilterButton';
import Search from '../components/Search';
import Poster from '../components/Poster';
//import Details from '../components/Details';

// Let's be lazy
const Details = defineAsyncComponent(() => import('../components/Details'));

export default {
    name: 'Inventory',
    components: {
        Details,
        Poster,
        FilterButton,
        Search
    },
    data() {
        return {
            filterLabels: ['All', '4K', 'BRAY', 'DVD'],
            pageTitle: this.$route.meta.title,
            details: {
                container: 0,
                collection: false,
                createdate: '',
                format: '',
                imageurl: '',
                location: '',
                notes: '',
                title: '',
                type: ''
            },
            filteredInventoryData: null
        }
    },
    mounted() {
        // No `async` magic needed since we've already set store state
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
        // Use the emitted UID to find specific inventory item and display it in the details
        showDetails(event) {
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
    grid: {
        template-columns: repeat(auto-fill, 108px);
        auto-rows: 162px;
    }
    margin-top: 40px;
}

.search {
    margin-top: 18px;
}
</style>