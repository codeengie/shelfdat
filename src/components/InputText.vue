<template>
    <div class="input" :class="validateField">
        <div class="input__wrap" :class="focusState">
            <label
                class="input__label"
                :for="label">{{ capitalizeLabel }}</label>
            <input
                :id="label"
                :value="modelValue"
                @blur="handleBlur"
                @focus="handleFocus"
                @input="$emit('update:modelValue', $event.target.value)"
                class="input__field"
                type="text"
                :max="maxNum"
                :min="minNum"
                v-bind="$attrs">
        </div>
        <div class="input__error">Please enter a {{ label }}</div>
    </div>
</template>

<script>
export default {
    name: 'InputText',
    props: {
        label: String,
        modelValue: [String, Number]
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isFocused: false,
            isValid: false
        }
    },
    computed: {
        capitalizeLabel() {
            return `${this.label.charAt(0).toUpperCase()}${this.label.slice(1)}`;
        },
        validateField() {
            return this.isValid ? 'input--error' : '';
        },
        // In VueJS an attribute can only be omitted if set to null or undefined
        maxNum() {
            const date = new Date();
            return (this.$attrs['type'] === 'number') ? date.getFullYear() : null;
        },
        minNum() {
            return (this.$attrs['type'] === 'number') ? 1950 : null;
        },
        focusState() {
            return this.isFocused ? 'input--focus': '';
        }
    },
    methods: {
        handleBlur(event) {
            this.toggleFocus();
            this.isValid = !(event.target.value);
        },
        handleFocus() {
            this.toggleFocus();
        },
        toggleFocus() {
            this.isFocused = !this.isFocused;
        }
    }
}
</script>

<style lang='scss' scoped>
.input {
    $self: &;

    &__field,
    &__label {
        font-size: 1.4rem;
    }

    &__error {
        color: var(--radical-red);
        font: {
            size: 1.2rem;
            weight: var(--weight-semibold);
        }
        display: none;
        margin-top: 6px;
    }

    &__field {
        background-color: transparent;
        color: var(--white);
        //height: 80%;
        width: 100%;
    }

    &__label {
        color: var(--dust-gray);
        margin-right: 18px;
    }

    &__wrap {
        align-items: center;
        background-color: var(--shark);
        display: flex;
        height: 40px;
        padding: 0 20px;
    }

    // Modifiers
    &--focus {
        outline: 2px solid var(--deep-cerulean);
    }

    &--error {
        #{$self}__error {
            display: block;
        }
    }
}
</style>