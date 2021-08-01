<template>
    <div class="sheet" :class="toggleAnimation">
        <button class="sheet__button" @click="handleAnimation">
            <img class="sheet__icon" src="images/add_24dp.svg" alt="Add">
        </button>
        <div class="sheet__content">
            <form>
                <input type="text" placeholder="Title">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sheet',
        data() {
            return {
                isSheetUp: null
            };
        },
        computed: {
            toggleAnimation() {
                return this.isSheetUp ? 'sheet--up' : '';
            }
        },
        methods: {
            handleAnimation() {
                this.isSheetUp = !this.isSheetUp;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sheet {
        $this: &;
        bottom: 0;
        left: 0;
        position: fixed;
        width: 100%;
        z-index: 1000;

        &__button {
            background-color: var(--dodger-blue);
            border-radius: 50%;
            height: 48px;
            position: absolute;
            right: 15px;
            top: -48px;
            width: 48px;
        }

        &__content {
            background-color: var(--white);
            height: 0;
            transition: height .15s ease-out;
        }

        &__icon {
            height: 28px;
            width: 28px;
        }

        &--up {
            #{$this} {
                &__button {}

                &__content {
                    height: 400px;
                    transition: height .2s ease-in;
                }
            }
        }
    }
</style>