<template>
    <div class="modwrap" :class="setClass">
        <h2 class="modwrap__title" v-if="$slots.heading">
            <slot name="heading"></slot>
        </h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ModWrap",
    props: {
        modifier: String
    },
    computed: {
        setClass() {
            return this.modifier ? `modwrap--${this.modifier}` : '';
        }
    }
}
</script>

<style lang="scss" scoped>
.modwrap {
    &__title {
        font: {
            size: 1.8rem;
            weight: 500;
        }
        margin: 8px 0;
        padding: 0 15px;
        text-align: center;
        width: 100%;
    }

    // Modifiers
    &--flex {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    // Note, grid-grap is equal to column/row-gap
    &--grid {
        align-items: center;
        column-gap: 15px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
        row-gap: 12px;
    }
}
</style>