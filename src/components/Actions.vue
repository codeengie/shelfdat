<template>
    <div class="actions">
        <button class="actions__button actions__button--edit">
            <img class="actions__icon" src="images/edit-24px.svg" alt="Edit">
        </button>
        <button class="actions__button actions__button--delete" @click="deleteInventoryItem">
            <img class="actions__icon" src="images/delete-24px.svg" alt="Delete">
        </button>
    </div>
</template>

<script>
export default {
    name: "Actions",
    emits: ['delete'],
    methods: {
        deleteInventoryItem() {
            this.$emit('delete');
        }
    }
}
</script>

<style lang="scss" scoped>
    .actions {
        align-self: end;
        margin-left: auto;

        &__button {
            background-color: transparent;

            &:last-child {
                margin-left: 10px;
            }
        }

        &__icon {
            height: auto;
            width: 20px;
        }
    }
</style>