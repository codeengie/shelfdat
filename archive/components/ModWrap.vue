<template>
    <div class="modwrap" :class="setClasses">
        <h2 class="modwrap__title" v-if="$slots.heading">
            <slot name="heading"></slot>
        </h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ModWrap',
    props: {
        modifier: [Array, String]
    },
    computed: {
        setClasses() {
            let classesToSet = '';

            if (Array.isArray(this.modifier)) {
                this.modifier.forEach(element => {
                    classesToSet += `modwrap--${element} `;
                });
            } else {
                classesToSet = this.modifier ? `modwrap--${this.modifier}` : '';
            }

            return classesToSet;
        }
    }
}
</script>

<!--
Need to upgrade to latest VueJS to use this: https://github.com/vuejs/core/pull/3882
<style lang="scss" slotted></style>
-->
<style lang="scss">
.modwrap {
    padding: 15px 0 10px;

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
    &--bg {
        background-color: var(--bg-color);
    }

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