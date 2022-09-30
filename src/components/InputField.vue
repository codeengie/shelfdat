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
            @blur="handleBlur"
            @focus="handleFocus"
            @input="$emit('update:modelValue', $event.target.value)"
            class="form__input">
        <label
            :for="fieldName.toLowerCase()"
            v-if="isValid"
            class="form__error">Please enter {{ `${insertAOrAn} ${fieldName.toLowerCase()}` }}.</label>
    </div>
</template>

<script>
// @todo Add autofocus to input fields, note autofocus had two possible values: autofocus or ""
export default {
    name: 'InputField',
    props: {
        fieldName: String,
        fieldType: String,
        modelValue: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            focused: false,
            inputValue: this.modelValue,
            isValid: false
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
        handleBlur(event) {
            const inputData = event.target.value;

            if (inputData) {
                // this.focused = !this.focused;
                this.focused = true;
                this.$emit('update:modelValue', inputData);
            } else {
                this.focused = false;
                this.isValid = true;
            }
        },
        handleFocus(event) {
            if (event.target.value === '') {
                this.focused = !this.focused;
                this.isValid = false;
            }
        },
        // @todo Look into refs to access this method from the parent
        validateField(event) {
            const inputData = event.target.value;

            if (inputData) {
                this.$emit('update:modelValue', inputData);
            } else {
                this.isValid = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    $this: &;

    &__error {
        color: var(--input-error-color);
        display: block;
        font-size: 1.2rem;
        margin-top: 8px;
    }

    &__group {
        &:not(:first-of-type) {
            margin-top: 15px;
        }

        &--input {
            height: 63px;
            position: relative;

            &.focused {
                #{$this} {
                    &__input {
                        border-bottom-color: var(--input-focus-color);
                    }

                    &__label {
                        color: var(--input-focus-color);
                        font: {
                            size: 1.2rem;
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
            bottom: 2px solid var(--input-border-color);
        }
        color: var(--input-text-color);
        font-size: 1.6rem;
        margin-top: 20px;
        position: relative;
        width: 100%;
        z-index: 1;
    }

    &__label {
        color: var(--input-text-color);
        font-size: 1.6rem;
        left: 0;
        position: absolute;
        top: 0;
        transform: translateY(20px);
        transition: all .2s;
    }
}
</style>