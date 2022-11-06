<template>
    <div class="textbox" :class="validateTextbox">
        <div class="textbox__wrap" :class="focusState">
            <label class="textbox__label" for="label">{{ capitalizeLabel }}</label>
            <textarea
                :maxlength="maxChars"
                :placeholder="$attrs.placeholder"
                :value="modelValue"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="$emit('update:modelValue', $event.target.value)"

                class="textbox__area"></textarea>
            <div class="textbox__counter">{{ `${totalCharCount}/${maxChars}` }}</div>
        </div>
        <div class="textbox__error">Please enter a {{ label }}</div>
    </div>
</template>

<script>
export default {
    name: 'InputTextArea',
    props: {
        cols: String,
        label: String,
        maxChars: [String, Number],
        modelValue: [String, Number],
        rows: String
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isFocused: false,
            isValid: false,
            charCount: 0
        }
    },
    computed: {
        capitalizeLabel() {
            return `${this.label.charAt(0).toUpperCase()}${this.label.slice(1)}`;
        },
        focusState() {
            return this.isFocused ? 'textbox--focus' : '';
        },
        totalCharCount() {
            return this.charCount;
        },
        validateTextbox() {
            return this.isValid ? 'textbox--error' : '';
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
    },
    watch: {
        modelValue(inputValue) {
            if (inputValue) {
                this.charCount = inputValue.length;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.textbox {
    $self: &;
    //margin-top: 20px;

    &__area,
    &__label {
        font: {
            family: 'Montserrat', sans-serif;
            size: 1.4rem;
        }
    }

    &__area {
        background-color: var(--shark);
        color: var(--white);
        height: 126px;
        margin-top: 8px;
        padding: 0 16px;
        width: 100%;

        &::placeholder {
            opacity: .2;
        }
    }

    &__counter {
        font-size: 1rem;
        padding: 10px 16px;
        text-align: right;
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

    &__label {
        display: block;
        padding: 10px 16px 0;
        width: 100%;
    }

    &__wrap {
        background-color: var(--shark);
    }

    // Modifier(s)
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