<template>
    <button
        :class="{ 'button--spinner': loadStatus }"
        :disabled="isDisabled"
        class="button">
        <span class="button__text">{{ buttonText }}</span>
    </button>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'Button',
    props: {
        buttonText: String,
        isDisabled: Boolean
    },
    computed: {
        ...mapGetters(['loadStatus'])
    }
}
</script>

<style lang="scss" scoped>
.button {
    $this: &;
    align: {
        self: center;
        items: center;
    }
    background-color: var(--primary-button-bg-color);
    border-radius: 4px;
    color: var(--primary-button-text-color);
    display: flex;
    font-size: 1.4rem;
    height: 40px;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: all .4s cubic-bezier(.36, 0, .75, -.30);
    width: 290px;

    &::after {
        animation: spinner .8s infinite linear;
        content: '';
        border: 3px solid var(--white) {
            left-color: transparent;
            radius: 50%;
            right-color: transparent;
        }
        height: 24px;
        opacity: 0;
        position: absolute;
        transition: opacity .2s ease-out .2s;
        width: 24px;
    }

    &::before {
        //@todo Need to figure out how to use a css variable here
        background-color: #052f52;
        border-radius: 50%;
        content: '';
        display: block;
        height: 0;
        opacity: 0;
        position: absolute;
        transition: all .3s ease-out;
        width: 0;
        z-index: 0;
    }

    &:disabled {
        background-color: var(--shark);
        color: var(--dusty-gray);
        cursor: not-allowed;
    }

    &:not([disabled]):hover {
        &::before {
            height: 500%;
            opacity: 1;
            width: 110%;
        }
    }

    &__text {
        opacity: 1;
        transition: all .2s linear .3s;
        z-index: 1;
    }

    &--spinner {
        border-radius: 50%;
        transition: all .8s cubic-bezier(.68, -.6, .32, 1.3);
        width: 40px;

        &::after {
            opacity: 1;
            transition: opacity .3s ease-in .5s;
        }

        &::before {
            display: none;
        }

        #{$this}__text {
            opacity: 0;
            transition: all .3s linear;
        }
    }
}

@keyframes spinner {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>