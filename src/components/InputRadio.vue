<template>
    <div class="form__group form__group--radio">
        <fieldset class="form__fieldset">
            <legend class="form__legend">{{ radioLabel }}</legend>
            <div class="form__wrap" v-for="(radioOption, index) in radioOptions" :key="radioOption">
                <input
                    class="form__radio"
                    :checked="setChecked(index)"
                    :id="`${convertToLowerCase(radioLabel)}Choice${index}`"
                    :name="convertToLowerCase(radioLabel)"
                    type="radio"
                    :value="radioOption"
                    @change="radioOptionSelected">
                <label
                    class="form__label"
                    :for="`${convertToLowerCase(radioLabel)}Choice${index}`">{{ radioOption }}</label>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: 'InputRadio',
        props: {
            modelValue: String,
            radioLabel: String,
            radioOptions: [Array, String]
        },
        data() {
            return {
                focused: false,
                activeOption: this.modelValue
            }
        },
        emits: ['update:modelValue'],
        methods: {
            // @todo This might be costly, try as a computed function
            convertToLowerCase(text) {
                return text.toLowerCase();
            },
            radioOptionSelected(event) {
                this.activeOption = event.target.value;
                this.$emit('update:modelValue', event.target.value);
                // console.log(`InputRadio Event: ${event.target.value}`);
            },
            setChecked(digit) {
                return (digit === 0);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        &__fieldset {
            background-color: var(--dove-gray);
            border: 0 {
                radius: 4px;
            }
            display: flex;
            height: 34px;
            padding: 2px;
            position: relative;
            width: 290px;
        }

        &__label,
        &__legend {
            font-weight: var(--weight-medium);
        }

        &__label {
            align-items: center;
            border-radius: 4px;
            color: var(--alto);
            cursor: pointer;
            display: flex;
            flex-grow: 1;
            font-size: 1.4rem;
            height: 100%;
            justify-content: center;
            text-transform: uppercase;
            width: auto;

            &:hover {
                color: var(--black);
                background-color: var(--white);
            }
        }

        &__legend {
            font-size: 1rem;
            left: 0;
            padding-top: 20px;
            position: absolute;
            top: -35px;
        }

        &__radio {
            appearance: none;
            position: absolute;

            &:checked + label {
                color: var(--black);
                background-color: var(--white);
            }
        }

        &__wrap {
            align-items: center;
            display: flex;
            flex: {
                basis: 0;
                grow: 1;
            }
            justify-content: center;

            &:not(:last-child) {
                margin-right: 2px;
            }
        }

        // @todo Remove
        &__group--radio {
            margin-top: 20px;
        }
    }
</style>