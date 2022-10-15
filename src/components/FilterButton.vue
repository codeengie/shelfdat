<template>
    <button
        @click="filterBy"
        :data-category="category"
        :value="keyword"
        class="filter__button">{{ buttonName }}</button>
</template>

<script>
export default {
    name: 'FilterButton',
    props: {
        buttonName: String,
        category: String,
        filterData: Array,
        keyword: String
    },
    emits: ['filteredInventory'],
    computed: {
        isActive() {
            return this.active ? 'filter__button--active' : '';
        }
    },
    methods: {
        filterBy(event) {
            const currElement = event.target;

            this.filterToggle(currElement);

            // Filter inventory data using keyword values within categories for format and type
            let filtered = this.filterData.filter(data => {
                switch(this.category) {
                    case 'format':
                        return data.format.toLowerCase() === currElement.value.toLowerCase();
                    case 'type':
                        return data.type.toLowerCase().includes(currElement.value.toLowerCase());
                    default:
                        return this.filterData;
                }
            });

            this.$emit('filteredInventory', filtered);
        },
        // Toggle the active state of the filter buttons
        filterToggle(buttonElement) {
            // Get all the filter buttons
            const buttons = buttonElement.closest('div').querySelectorAll('.filter__button');

            // Find and remove `--active` class from previously clicked filter button
            buttons.forEach(button => button.classList.remove('filter__button--active'));

            // Add `--active` class to filter button that was clicked
            buttonElement.classList.add('filter__button--active');
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
        transition: all .2s ease-out;

        &:hover {
            background-color: var(--filter-button-hover);
            color: var(--filter-button-text-hover);
            transition: all .4s ease-in;
        }

        &--active {
            background-color: var(--primary-button-bg-color);
            color: var(--white);
        }
    }
}
</style>