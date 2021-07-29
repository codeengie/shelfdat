<template>
    <div class="inventory-item">
        <h2 class="inventory-item__type">{{ type }}</h2>
        <h2 class="inventory-item__format">{{ format }}</h2>
        <h1 class="inventory-item__title">{{ title }}</h1>
        <p class="inventory-item__location">This movie is located on the {{ location }}</p>
        <nas-actions v-bind="$attrs"></nas-actions>
    </div>
</template>

<script>
export default {
    name: "Inventory",
    props: {
        format: String,
        location: String,
        title: String,
        type: String
    }
}
</script>

<style lang="scss" scoped>
.inventory-item {
    align-items: stretch;
    background-color: #464646;
    display: flex;
    flex-flow: row wrap;
    height: 164px;
    padding: 10px 15px;
    width: 290px;

    &:not(:first-child) {
        margin-top: 4px;
    }

    &__format,
    &__type {
        color: #a8a8a8;
        font: {
            size: 1.2rem;
            weight: 500;
        }
        flex: 1;
        text-transform: uppercase;
    }

    &__format {
        text-align: right;
    }

    &__location {
        color: #a8a8a8;
        font: {
            size: 1.2rem;
            weight: 400;
        }
        margin-top: 12px;
        width: 100%;
    }

    &__title {
        color: #fff;
        font: {
            size: 1.8rem;
            weight: 900;
        }
        margin-top: 6px;
        text-transform: uppercase;
        width: 100%;
    }

    &__type {
    }
}
</style>