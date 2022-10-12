<template>
    <div class="search">
        <label class="search__label" for="search-box"></label>
        <input
            :placeholder="placeholderText"
            @input="searchInventory"
            class="search__box"
            id="search-box"
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
        searchInventory(event) {
            clearTimeout(this.delayTime);
            const domElement = event.target.closest('div');

            domElement.classList.add('search--loader');

            this.delayTime = setTimeout(() => {
                let filtered = this.searchData.filter(data =>
                    data.title.toLowerCase().includes(this.searchQuery.toLowerCase()));

                this.$emit('searchedInventory', filtered);
                domElement.classList.remove('search--loader');
            }, this.timeout);
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
    $self: &;
    display: flex;

    &__box {
        background-color: var(--search-bg-color);
        border: 0;
        color: var(--search-text-color);
        font: {
            family: 'Montserrat', sans-serif;
            size: 1.4rem;
        }
        height: 40px;
        padding: 0 48px 0 2px;
        width: 100%;

        &::placeholder {
            color: var(--search-text-color);
            opacity: 1;
        }
    }

    &__label {
        align-items: center;
        background-color: var(--search-bg-color);
        display: flex;
        height: 40px;
        justify-content: center;
        position: relative;
        width: 48px;

        &::after,
        &::before {
            content: '';
            position: absolute;
        }

        // Magnifying glass icon
        &::after {
            background: transparent url('../assets/icons/search.svg') center center/22px no-repeat;
            height: 22px;
            opacity: 1;
            scale: 1;
            transition: all .3s;
            width: 22px;
        }

        // Loader icon
        &::before {
            border: 2px solid var(--dusty-gray) {
                bottom-color: var(--cobalt);
                radius: 50%;
            }
            height: 16px;
            opacity: 0;
            scale: 0;
            transition: all .3s;
            width: 16px;
        }
    }

    // Modifier
    &--loader {
        #{$self}__label {
            // Magnifying glass icon
            &::after {
                animation: swappa .2s linear reverse, ghost .1s ease;
                opacity: 0;
                scale: 0;
            }

            // Loader icon
            &::before {
                animation: swappa .4s cubic-bezier(.16, 1, .3, 1), spin .8s linear infinite;
                opacity: 1;
                scale: 1;
            }
        }
    }

    // @todo Refactor with the same animation from button and place it globally scoped
    @keyframes spin {
        0% { rotate: 0deg; }
        100% { rotate: 360deg; }
    }

    @keyframes swappa {
        0% { scale: 0; }
        100% { scale: 1; }
    }

    @keyframes ghost {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
}
</style>