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
            @blur="handleEvents"
            @focus="handleFocus"
            class="form__input">
        <label
            :for="fieldName.toLowerCase()"
            v-if="isValid"
            class="form__error">Please enter {{ `${insertAOrAn} ${fieldName.toLowerCase()}` }}.</label>
    </div>
</template>

<script>
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
        handleEvents(event) {
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
            console.log(`Focus: ${event.target}`); // @todo remove
            this.focused = !this.focused;
            this.isValid = false;
        },
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
        color: var(--form-error-color);
    }

    &__group {
        &:not(:first-of-type) {
            margin-top: 15px;
        }

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

        &:focus {
            outline: none;
        }
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