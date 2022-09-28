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
    computed: {
        isActive() {
            return this.active ? 'filter__button--active' : '';
        }
    },
    methods: {
        filterBy(event) {
            let currElement = event.target;
            const buttons = currElement
                .closest('div')
                .querySelectorAll('.filter__button--active');

            buttons.forEach(button => button.classList.remove('filter__button--active'));
            currElement.classList.add('filter__button--active');
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

        &--active {
            background-color: var(--primary-button-bg-color);
            color: var(--white);
        }
    }
}
</style>