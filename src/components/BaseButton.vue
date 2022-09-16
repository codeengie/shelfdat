<template>
    <button
        :class="className"
        :disabled="isDisabled"><span>{{ buttonText }}</span></button>
    <div class="cbutton cbutton--spinner"></div>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        buttonText: String,
        className: String,
        isDisabled: Boolean
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .cbutton {
        &--spinner {
            animation: spinner .8s infinite linear;
            border: 3px solid black {
                left-color: transparent;
                radius: 50%;
                right-color: transparent;
            }
            height: 24px;
            width: 24px;
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

    button {
        align-items: center;
        background-color: var(--form-btn-bg-color);
        border-radius: 4px;
        color: var(--form-btn-text-color);
        display: flex;
        font: {
            size: 1.6rem;
            weight: var(--weight-medium);
        }
        height: 40px;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: 290px;

        &::before {
            //@todo Need to figure out how to use a css variable here
            background-color: darken(#00b9ff, 20%);
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
            background-color: grey;
            color: darkgrey;
            cursor: not-allowed;
        }

        &:not([disabled]):hover {
            &::before {
                height: 500%;
                opacity: 1;
                width: 110%;
            }
        }

        span {
            z-index: 1;
        }
    }
</style>