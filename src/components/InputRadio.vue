<template>
    <div class="radio">
        <fieldset class="radio__wrap" :class="focusState">
            <legend class="radio__legend">{{ capitalizeLabel }}</legend>
            <div class="radio__group"
                v-for="(option, index) in options"
                :key="option">
                    <input
                        :checked="setChecked(index)"
                        :id="`${label}Choice${index}`"
                        :name="label"
                        :value="`${values[index]}`"
                        @blur="handleBlur"
                        @change="$emit('update:modelValue', $event.target.value)"
                        @focus="handleFocus"
                        class="radio__input"
                        type="radio"
                        :ref="`radio${label}`">
                    <label
                        :for="`${label}Choice${index}`"
                        class="radio__label">{{ option }}</label>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {
    name: 'InputRadio',
    props: {
        label: String,
        options: [Array, String],
        values: [Array, String]
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isFocused: false
        }
    },
    computed: {
        capitalizeLabel() {
            return `${this.label.charAt(0).toUpperCase()}${this.label.slice(1)}`;
        },
        focusState() {
            return this.isFocused ? 'radio--focus' : '';
        }
    },
    methods: {
        handleBlur() {
            this.toggleFocus();
        },
        handleFocus(event) {
            this.toggleFocus();
            this.$emit('update:modelValue', event.target.value);
        },
        toggleFocus() {
            this.isFocused = !this.isFocused;
        },
        setChecked(digit) {
            return (digit === 0);
        }
    }
}
</script>

<style lang="scss" scoped>
.radio {
    background-color: var(--shark);

    &__group {
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

    &__label {
        align-items: center;
        cursor: pointer;
        display: flex;
        flex-grow: 1;
        height: 100%;
        justify-content: center;
        width: auto;
    }

    &__legend {
        left: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    &__input {
        appearance: none;
        position: absolute;

        &:checked + label {
            color: var(--white);
            background-color: var(--cobalt);
        }
    }

    &__wrap {
        border: 0;
        display: flex;
        height: 40px;
        margin: 0;
        padding: 4px 4px 4px 110px;
        position: relative;
    }

    // Modifier(s)
    &--focus {
        outline: 2px solid var(--deep-cerulean);
    }
}
</style>