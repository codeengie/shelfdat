<template>
    <div class="content">
        <h1 class="content__title">{{ pageTitle }} New</h1>

        <form class="create__form">
            <InputFile/>
        </form>

        <!-- New Media Form -->
         <NewMedia media-db-data @addLastMedia="updateMedia"/>
    </div>
</template>

<script>
import NewMedia from '../components/NewMedia';
import InputFile from '../components/InputFile';

export default {
    name: 'Create',
    components: { InputFile, NewMedia },
    data() {
        return {
            pageTitle: this.$route.meta.title
        }
    },
    methods: {
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