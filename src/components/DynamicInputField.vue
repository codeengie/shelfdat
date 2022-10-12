<template>
    <div class="dynamic">
        <div
            v-for="(input, index) in inputs"
            :key="index"
            class="dynamic__wrap">
            <InputText
                :label="input.label"
                :placeholder="input.placeholder"
                :value="input.value"
                @input="$emit('update:modelValue', $event.target.value)"/>
            <button
                v-if="index !== 0"
                @click.prevent="removeInputField(index)"
                class="dynamic__close" >
                <span class="dynamic__close-icon"></span>
            </button>
        </div>
        <button class="dynamic__add" @click.prevent="addInputField">
            <span class="dynamic__add-icon">Add to collection</span>
        </button>
    </div>
</template>

<script>
import InputText from './InputText';
export default {
    name: 'DynamicInputField',
    components: { InputText },
    emits: ['update:modelValue'],
    data() {
        return {
            inputs: [
                {
                    label: 'title',
                    placeholder: '',
                    value: '',
                    vm: 'modelo'
                }
            ],
            modeloObj: []
        }
    },
    methods: {
        addInputField() {
            this.inputs.push(this.inputs[0]);
        },
        removeInputField(index) {
            console.log(index);

            if (index !== 0) {
                console.log(index);
                this.inputs.splice(index, 1);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.dynamic {
    margin-top: 20px;

    &__add {
        background-color: transparent;
        color: var(--dusty-gray);
        font-size: 1.4rem;
        margin-top: 20px;

        &-icon {
            align-items: center;
            display: flex;
            padding-left: 24px;
            position: relative;

            &::before {
                background: transparent url('../assets/icons/add.svg') center center no-repeat;
                content: '';
                height: 15px;
                left: 0;
                position: absolute;
                width: 15px;
            }
        }
    }

    &__close {
        position: absolute;
        right: 28px;
        top: 50%;
        transform: translateY(-50%);

        &-icon {
            background: transparent url('../assets/icons/close.svg') center center no-repeat;
            display: block;
            height: 14px;
            width: 14px;
        }
    }

    &__wrap {
        position: relative;
    }
}
</style>