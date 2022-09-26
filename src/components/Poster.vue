<template>
    <figure class="poster">
        <a class="poster__link" href="#">
            <img
                :data-uid="posterId"
                :height="posterHeight"
                :src="srcImage"
                :title="posterTitle"
                :width="posterWidth"
                @click="getId"
                alt="Poster"
                class="poster_img"
                loading="lazy">
        </a>
    </figure>
</template>

<script>
export default {
    name: 'Poster',
    props: {
        posterHeight: {
            default: '248',
            type: String
        },
        posterId: String,
        posterSrc: String,
        posterTitle: String,
        posterWidth: {
            default: '166',
            type: String
        }
    },
    computed: {
        srcImage() {
            return this.posterSrc ? `${process.env.VUE_APP_S3_BUCKET_URL}images/inventory/posters/${this.posterSrc}` : 'images/placeholder.svg';
        }
    },
    methods: {
        getId(event) {
            console.log(event);
        }
    }
}
</script>

<style lang="scss" scoped>
.poster {
    background-color: var(--shark);
}
</style>