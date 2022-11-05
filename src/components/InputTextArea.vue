<template>
    <div class="textbox" :class="validateTextbox">
        <div class="textbox__wrap">
            <label class="textbox__label" for="label">{{ capitalizeLabel }}</label>
            <textarea
                :cols="cols"
                :maxlength="maxChars"
                :rows="rows"
                :value="modelValue"
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
            isValid: false,
            charCount: 0
        }
    },
    computed: {
        capitalizeLabel() {
            return `${this.label.charAt(0).toUpperCase()}${this.label.slice(1)}`;
        },
        totalCharCount() {
            return this.charCount;
        },
        validateTextbox() {
            return this.isValid ? 'textbox--error': '';
        }
    },
    methods: {
        handleBlur(event) {
            this.isValid = !(event.target.value);
        }
    },
    watch: {
        modelValue(newValue) {
            this.charCount = newValue.length;
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
        //padding-bottom: 20px;
    }

    // Modifier(s)
    &--error {
        #{$self}__error {
            display: block;
        }
    }
}
</style>