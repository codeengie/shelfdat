<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} New</h1>
        <form class="create-form" @submit.prevent="submitItem()">
            <InputFile
                class="create-form__upload"
                v-model="formInputs.file"
                ref="fileUpload"/>
            <InputText
                class="create-form__title"
                label="title"
                placeholder="An Awesome Movie"
                v-model="formInputs.title"/>
            <InputRadio
                v-for="(radio, index) in radioInputs"
                :class="`create-form__radio-${index}`"
                :key="radio"
                :label="radio.label"
                :options="radio.options"
                v-model="formInputs[radio.label]"
                ref="renderedRadios"/>
            <DynamicInputField
                v-if="formInputs.collection === 'Yes'"
                v-model="formInputs.other"/>
            <!-- Maxlength attribute is ignored when input is set to number -->
            <InputText
                class="create-form__year"
                label="year"
                pattern="\d*"
                placeholder="YYYY"
                type="number"
                v-model="formInputs.year"/>
            <InputText
                class="create-form__location"
                label="location"
                placeholder="Junk Room"
                v-model="formInputs.location"/>
            <InputText
                class="create-form__container"
                label="bin"
                placeholder="000"
                type="number"
                v-model="formInputs.container"/>
            <InputTextArea
                class="create-form__textbox"
                label="notes"
                max-chars="250"
                placeholder="Enter a note..."
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
import InputTextArea from '@/components/InputTextArea';

// Let's be lazy
const DynamicInputField = defineAsyncComponent(() => import('../components/DynamicInputField'));

export default {
    name: 'Create',
    components: {
        Button,
        DynamicInputField,
        InputFile,
        InputRadio,
        InputText,
        InputTextArea
    },
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

        // Set file upload focus on load
        this.$refs.fileUpload.$refs.inputfile.focus();
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
                this.formInputs.container &&
                this.formInputs.notes) {

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

    &__button,
    &__container,
    &__location,
    &__radio-0,
    &__radio-1,
    &__radio-2,
    &__textbox,
    &__title,
    &__year {
        @media (width <= 768px ) {
            margin-top: 20px;
        }
    }

    @media (width >= 768px) {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: minmax(40px, auto);
        grid-template-areas:
            'cfu cft cft'
            'cfu cfr0 cfr0'
            'cfu cfr1 cfr1'
            'cfu cfr2 cfr2'
            'cfy cfl cfc'
            'cftb cftb cftb'
            'cfb cfb cfb';

        &__button {
            grid-area: cfb;
        }

        &__container {
            grid-area: cfc;
        }

        &__location {
            grid-area: cfl;
        }

        &__radio-0 {
            grid-area: cfr0;
        }

        &__radio-1 {
            grid-area: cfr1;
        }

        &__radio-2 {
            grid-area: cfr2;
        }

        &__textbox {
            grid-area: cftb;
        }

        &__title {
            grid-area: cft;
        }

        &__upload {
            grid-area: cfu;
        }

        &__year {
            grid-area: cfy;
        }
    }

    &__upload {
        align-self: center;
    }
}
</style>