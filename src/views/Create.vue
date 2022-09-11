<template>
    <div class="content">
        <h1>{{ pageTitle }} Media</h1>

        <!-- New Media Form -->
        <nas-newmedia
            media-db-data
            @addLastMedia="updateMedia">
        </nas-newmedia>
    </div>
</template>

<script>
export default {
    name: 'Create',
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