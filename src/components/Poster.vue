<template>
    <figure class="poster">
        <img
            :data-uid="posterId"
            :height="posterHeight"
            :src="srcImage"
            :title="titleAndYear"
            :width="posterWidth"
            @click="getId"
            alt="Poster"
            class="poster__img"
            loading="lazy">
    </figure>
</template>

<script>
import { mapGetters } from 'vuex';
// This seems Mickey Mouse @todo Find a better solution for JS image src
import placeholderImg from '../assets/global/placeholder.svg'

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
        },
        posterYear: Number
    },
    computed: {
        ...mapGetters(['userInfo']),
        srcImage() {
            return this.posterSrc ? `${process.env.VUE_APP_CACHE_BUCKET_URL}users/${this.userInfo.id}/inventory/${this.posterSrc}` : placeholderImg;
        },
        titleAndYear() {
            return `${this.posterTitle} (${this.posterYear})`;
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
    $self: &;

    &__img {
        transition: all .2s ease-in-out;
        height: auto;
        scale: 1;
        width: 100%;
    }

    // Modifier(s)
    &--hover {
        #{$self}__img {
            &:hover {
                transition: all .2s ease-in;
                scale: 1.2;
            }
        }
    }
}
</style>