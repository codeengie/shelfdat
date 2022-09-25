<template>
    <div class="search">
        <input
            :placeholder="placeholderText"
            @keyup="searchList"
            @input="$emit('update:modelValue', $event.target.value)"
            class="search__box">
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        placeholderText: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            timeout: 900
        }
    },
    methods: {
        // @todo Keep an eye on this, might need a conditional so it doesn't fire when empty
        // Added a `setTimeout()` to help with the minor stuttering I've observed
        searchList(event) {
            clearTimeout(delayTime);

            const delayTime = setTimeout(() => {
                console.log('Searching with delay: ', event.target.value);
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