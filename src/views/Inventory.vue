<template>
    <div class="content">
        <h1>{{ pageTitle }}</h1>

        <!-- Search Form -->
        <div class="search">
            <input class="search__box" placeholder="Search media..." v-model.trim="searchKey">
        </div>

        <!-- Redo this component to use Dynamic Props 93 -->
        <section>
            <div v-if="loadStatus">
                <Skeleton
                    v-for="skeleton in skeletons"
                    :key="skeleton"/>
            </div>

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
        </section>
    </div>
</template>

<script>
import Items from '../components/Items';
import Skeleton from '../components/Skeleton';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Inventory',
    components: {
        Items,
        Skeleton
    },
    data() {
        return {
            pageTitle: this.$route.meta.title,
            searchKey: '',
            skeletons: 6
        }
    },
    created() {
        this.getInventory();
    },
    computed: {
        ...mapGetters(['inventoryData', 'loadStatus']),
        mediaSearch() {
            return this.inventoryData.filter(media => {
                return media.title.toLowerCase().includes(this.searchKey.toLowerCase());
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
h1 {
    font: {
        size: 1.6rem;
        weight: 500;
    }
    margin-top: 15px;
    padding: 0 15px;
}

.search {
    margin: 15px 0;
    padding: 0 15px;

    &__box {
        width: 100%;
    }
}
</style>