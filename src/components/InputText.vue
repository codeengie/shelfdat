<template>
    <div class="input" :class="validateField">
        <div class="input__wrap">
            <label
                class="input__label"
                :for="label">{{ capitalizeLabel }}</label>
            <input
                :id="label"
                :placeholder="placeholder"
                :value="modelValue"
                @blur="handleBlur"
                @input="$emit('update:modelValue', $event.target.value)"
                class="input__field"
                type="text">
        </div>
        <div class="input__error">Please enter a {{ label }}</div>
    </div>
</template>

<script>
export default {
    name: 'InputText',
    props: {
        label: String,
        modelValue: [String, Number],
        placeholder: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isValid: false
        }
    },
    computed: {
        capitalizeLabel() {
            return `${this.label.charAt(0).toUpperCase()}${this.label.slice(1)}`;
        },
        validateField() {
            return this.isValid ? 'input--error' : '';
        }
    },
    methods: {
        handleBlur(event) {
            this.isValid = !(event.target.value);
        }
    }
}
</script>

<style lang='scss' scoped>
.input {
    $self: &;
    margin-top: 20px;

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
    &--error {
        #{$self}__error {
            display: block;
        }
    }
}
</style>