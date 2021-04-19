<template>
    <div
        :class="toggleFocus"
        class="form__group form__group--input">
        <label
            :for="fieldName.toLowerCase()"
            class="form__label">{{ fieldName }}</label>
        <input
            :id="fieldName.toLowerCase()"
            :type="fieldType"
            @blur="handleFocus"
            @focus="handleFocus"
            class="form__input">
        <label
            :for="fieldName.toLowerCase()"
            class="form__error">Please enter {{ `${insertAOrAn} ${fieldName.toLowerCase()}` }}.</label>
    </div>
</template>

<script>
export default {
    name: 'InputField',
    props: {
        fieldName: String,
        fieldType: String
    },
    data() {
        return {
            focused: false,
            isValid: null
        };
    },
    computed: {
        insertAOrAn() {
            const pattern = /^[aeiouAEIOU]/g;
            return pattern.test(this.fieldName) ? 'an' : 'a';
        },
        toggleFocus() {
            return this.focused ? 'focused' : '';
        }
    },
    methods: {
        handleFocus(event) {
            this.focused = !this.focused;
            console.log(`Focus: ${event.target}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    $this: &;

    &__group {
        &--input {
            &.focused {
                #{$this} {
                    &__input {
                        border-bottom-color: var(--form-focus-highlight);
                    }

                    &__label {
                        color: var(--form-focus-highlight);
                        font: {
                            size: 1rem;
                            weight: var(--weight-medium);
                        }
                        transform: translateY(0);
                        transition: all .3s;
                    }
                }
            }
        }
    }

    &__input {
        background-color: transparent;
        border: 0 {
            bottom: 2px solid #000000;
        }
        color: #000000;
        font-size: 1.6rem;
        position: relative;
        width: 100%;
        z-index: 1;
    }

    &__label {
        color: #000000;
        display: inline-block;
        font-size: 1.4rem;
        transform: translateY(20px);
        transition: all .2s;
    }
}
</style>