<template>
    <div class="content">
        <h1>{{ pageTitle }} Media</h1>

        <!-- New Media Form -->
         <NewMedia media-db-data @addLastMedia="updateMedia"/>
    </div>
</template>

<script>
import NewMedia from '../components/NewMedia';

export default {
    name: 'Create',
    components: { NewMedia },
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
h1 {
    font: {
        size: 1.6rem;
        weight: 500;
    }
    margin-top: 15px;
    padding: 0 15px;
}
</style>