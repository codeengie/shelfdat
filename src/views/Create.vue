<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} New</h1>

        <form class="create__form" @submit.prevent="createNew()">
            <InputFile/>
            <InputText
                label="title"
                placeholder="Enter a title"
                v-model="formInputs.title"/>
            <InputRadio
                v-for="radio in radioInputs"
                :key="radio"
                :label="radio.label"
                :options="radio.options"
                v-model="formInputs[radio.label]"/>
            <DynamicInputField v-if="formInputs.collection === 'Yes'"/>
            <InputText
                label="year"
                placeholder="1930"
                v-model="formInputs.year"/>
            <InputText
                label="location"
                placeholder="Some Room"
                v-model="formInputs.location"/>
            <InputText
                label="bin"
                placeholder="000"
                v-model="formInputs.container"/>
            <InputText
                label="notes"
                placeholder="Addional notes"
                v-model="formInputs.notes"/>
        </form>

        <!-- New Media Form -->
         <NewMedia media-db-data @addLastMedia="updateMedia"/>
    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';
import NewMedia from '../components/NewMedia';
import InputFile from '../components/InputFile';
import InputText from '../components/InputText';
import InputRadio from '../components/InputRadio';

// Let's be lazy
const DynamicInputField = defineAsyncComponent(() => import('../components/DynamicInputField'));

export default {
    name: 'Create',
    components: { DynamicInputField, InputRadio, InputText, InputFile, NewMedia },
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
                    options: ['4K', 'BRAY', 'DVD']
                },
                {
                    label: 'collection',
                    options: ['No', 'Yes']
                }
            ]
        }
    },
    methods: {
        createNew() {
            console.log('Creating new');
        },
        updateMedia(mediaRecord) {
            // this.mediaDbData.push(mediaRecord);
            console.log(`Added latest media record: ${mediaRecord}`);
        }
    }
}
</script>

<style lang="scss" scoped>
// @todo Globalize, its repeated in other views
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

.create__form {
    margin-top: 22px;
}
</style>