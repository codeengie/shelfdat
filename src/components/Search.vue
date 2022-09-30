<template>
    <div class="search">
        <input
            :placeholder="placeholderText"
            @input="searchInventory"
            class="search__box"
            v-model="searchQuery">
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        placeholderText: String,
        searchData: Array
    },
    emits: ['searchedInventory'],
    data() {
        return {
            timeout: 1000,
            searchQuery: ''
        }
    },
    methods: {
        /**
         * The `this` dilemma...setTimeout is invoked with a `this` of its own, which is why
         * without it the search method fires as many times as the user types. There are a few
         * ways of working around it, via a wrapper or bind. I found applying `this` to delayTime
         * works.
         */
        searchInventory() {
            clearTimeout(this.delayTime);

            this.delayTime = setTimeout(() => {
                let filtered = this.searchData.filter(data =>
                    data.title.toLowerCase().includes(this.searchQuery.toLowerCase()));

                this.$emit('searchedInventory', filtered);
            }, this.timeout);
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    &__box {
        color: var(--search-text-color);
        background: var(--search-bg-color) url('/images/icons/search.svg') 16px center/22px no-repeat;
        border: 0;
        font: {
            family: 'Montserrat', sans-serif;
            size: 1.4rem;
        }
        height: 40px;
        padding: 0 60px;
        width: 100%;

        &::placeholder {
            color: var(--search-text-color);
            opacity: 1;
        }
    }
}
</style>