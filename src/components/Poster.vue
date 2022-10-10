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
                class="poster__img"
                loading="lazy">
        </a>
    </figure>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Poster',
    emits: ['broadcastId'],
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
        ...mapGetters(['userInfo']),
        srcImage() {
            return this.posterSrc ? `${process.env.VUE_APP_CACHE_BUCKET_URL}images/users/${this.userInfo.id}/inventory/${this.posterSrc}` : 'images/global/placeholder.svg';
        }
    },
    methods: {
        getId(event) {
            this.$emit('broadcastId', event.target.dataset.uid);
        }
    }
}
</script>

<style lang="scss" scoped>
.poster {
    &__img {
        transition: all .2s ease-in-out;
        height: auto;
        scale: 1;
        width: 100%;

        &:hover {
            transition: all .2s ease-in;
            scale: 1.2;
        }
    }
}
</style>