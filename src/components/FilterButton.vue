<template>
    <button
        @click="filterBy"
        :value="buttonName"
        class="filter__button">{{ buttonName }}</button>
</template>

<script>
export default {
    name: 'FilterButton',
    props: {
        buttonName: String
    },
    methods: {
        filterBy(event) {
            console.log('Filter button clicked:', event.target);
        }
    }
}
</script>

<style lang="scss" scoped>
$button-spacing: 4px;

.filter {
    &__button {
        color: var(--filter-button-text-color);
        background-color: var(--filter-button-bg);
        height: 32px;
        width: 60px;

        &:hover {
            background-color: var(--filter-button-hover);
            color: var(--filter-button-text-hover);
        }
    }
}
</style>