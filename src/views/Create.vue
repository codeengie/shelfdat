<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} New</h1>

        <form class="create-form" @submit.prevent="submitItem()">
            <InputFile
                class="create-form__upload"
                v-model="formInputs.file"
                ref="fileUpload"/>
            <InputText
                label="title"
                v-model="formInputs.title"/>
            <InputRadio
                v-for="radio in radioInputs"
                :key="radio"
                :label="radio.label"
                :options="radio.options"
                v-model="formInputs[radio.label]"
                ref="renderedRadios"/>
            <DynamicInputField
                v-if="formInputs.collection === 'Yes'"
                v-model="formInputs.other"/>
            <InputText
                label="year"
                pattern="\d*"
                placeholder="YYYY"
                type="number"
                v-model="formInputs.year"/>
            <InputText
                label="location"
                v-model="formInputs.location"/>
            <InputText
                label="bin"
                v-model="formInputs.container"/>
            <InputText
                label="notes"
                v-model="formInputs.notes"/>
            <Button
                button-text="Save"
                class="create-form__button"/>
        </form>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import InputFile from '../components/InputFile';
import InputText from '../components/InputText';
import InputRadio from '../components/InputRadio';
import Button from '../components/Button';

// Let's be lazy
const DynamicInputField = defineAsyncComponent(() => import('../components/DynamicInputField'));

export default {
    name: 'Create',
    components: { Button, DynamicInputField, InputRadio, InputText, InputFile },
    data() {
        return {
            formInputs: {},
            pageTitle: this.$route.meta.title,
            radioInputs: [
                {
                    label: 'type',
                    options: ['Movie', 'TV Show']
                },
                {
                    label: 'format',
                    options: ['4K Blu-ray', 'Blu-ray', 'DVD']
                },
                {
                    label: 'collection',
                    options: ['No', 'Yes']
                }
            ]
        }
    },
    mounted() {
        // Focus radio button to set the initial value, this prevents user from clicking twice
        this.radioInputs.forEach((input, index) => {
            let labelVal = `radio${input.label}`;
            `${this.$refs.renderedRadios[index].$refs[labelVal][0].focus()}`;
        });
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        ...mapActions(['addNewItem']),
        resetForm() {
            this.formInputs = {};
            // @todo Look into expose instead of $refs to access methods inside components
            this.$refs.fileUpload.deleteFile();
        },
        submitItem() {
            const formData = new FormData();

            if (this.formInputs.file &&
                this.formInputs.title &&
                this.formInputs.year &&
                this.formInputs.location &&
                this.formInputs.container) {

                // Build form data
                Object.keys(this.formInputs).forEach(key => {
                    formData.append(key, this.formInputs[key]);
                });

                // Setting here because I didn't feel comfortable having it in a hidden field
                formData.append('id', this.userInfo.id);

                // Add new item to database and reset form
                this.addNewItem(formData);
                this.resetForm();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    padding: 35px var(--block-spacing) 24px;

    &__title {
        color: var(--secondary-text-color);
        font: {
            size: var(--primary-text-size);
            weight: var(--weight-medium);
        }
    }
}

.create-form {
    display: flex;
    flex-direction: column;
    margin: 22px auto 0;
    min-width: 320px;

    &__button {
        margin-top: 20px;
    }

    &__upload {
        align-self: center;
    }
}
</style>