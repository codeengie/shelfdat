<template>
    <div class="details" :class="dialogMod">
        <button class="details__close" @click="toggleDialog">Back</button>
        <figure class="details__fig">
            <img
                alt="Foobar"
                class="details__img"
                height="164"
                :src="setImage"
                width="412">
        </figure>
        <div class="details__content">
            <ContextMenu
                v-if="userInfo.role === 'superadmin'"
                class="details__edit"/>
            <h2 class="details__title">{{ titles[0] }} <span class="details__year">{{ `(${year})` }}</span></h2>
            <h3 class="details__subtitle">{{ titles[1] }}</h3>
            <ul class="details__icons">
                <li class="details__icons-item" :class="rez" :title="format">{{ format }}</li>
                <li class="details__icons-item" :class="typeSet" :title="type">{{ type }}</li>
                <li class="details__icons-item details__icons-item--collection"
                    v-if="collection" title="Collection">Collection</li>
            </ul>
            <h4 class="details__header">Location</h4>
            <p class="details__text">{{ location }}<span class="details__bullet">Bin:</span> {{ container }}</p>

            <h4 class="details__header">Notes</h4>
            <p class="details__text">{{ notes }}</p>

            <time class="details__date" datetime="2022-09-17T18:36:22.473Z">{{ prettyDate }}</time>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// This seems Mickey Mouse @todo Find a better solution for JS image src
import placeholderImg from '../assets/global/placeholder.svg'
import {defineAsyncComponent} from 'vue';

// Let's be lazy
const ContextMenu = defineAsyncComponent(() => import('../components/ContextMenu'));

export default {
    name: 'Details',
    components: { ContextMenu },
    props: {
        collection: Boolean,
        container: Number,
        createdate: String,
        format: String,
        imageurl: String,
        location: String,
        notes: String,
        title: String,
        type: String,
        year: Number
    },
    data() {
        return {
            isDialogOpen: false
        }
    },
    computed: {
        ...mapGetters(['userInfo']),
        dialogMod() {
            return this.isDialogOpen ? 'details--open' : '';
        },
        prettyDate() {
            if (this.createdate) {
                const newDate = new Date(this.createdate).toDateString().split(' ');
                return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
            } else {
                return 'No date available';
            }
        },
        rez() {
            let modifier = 'details__icons-item--';

            switch(this.format) {
                case '4K Blu-ray':
                    return `${modifier}fourkay`;
                case 'Blu-ray':
                    return `${modifier}hd`;
                default:
                    return `${modifier}sd`;
            }
        },
        setImage() {
            return this.imageurl ? `${process.env.VUE_APP_CACHE_BUCKET_URL}users/${this.userInfo.id}/inventory/${this.imageurl}` : placeholderImg;
        },
        titles() {
            return this.title.split(/:/).map(title => title.trim());
        },
        typeSet() {
            let modifier = 'details__icons-item--';
            return this.type.toLocaleLowerCase() === 'movie' ? `${modifier}movie` : `${modifier}tv`;
        }
    },
    methods: {
        // @todo Need to clear all data on close
        toggleDialog() {
            this.isDialogOpen = !this.isDialogOpen;
        }
    }
}
</script>

<style lang="scss" scoped>
%hide-text {
    overflow: hidden;
    text-indent: 100%;
    white-space: nowrap;
}

.details {
    background-color: var(--dialog-bg-color);
    inset: 0; // Equivalent to top, right, bottom, left = 0
    overflow: hidden;
    position: fixed;
    transition: all .3s cubic-bezier(.08,.82,.17,1);;
    transform: translateY(100%);

    &__bullet {
        &::before {
            content: '\00B7';
            padding: 0 6px;
        }
    }

    &__close {
        @extend %hide-text;
        background: transparent url('../assets/icons/arrow.svg') 0 0/20px no-repeat;
        filter: drop-shadow(2px 2px 3px #000);
        height: 20px;
        left: 20px;
        position: absolute;
        top: 16px;
        width: 20px;
        z-index: 1;
    }

    &__content {
        padding: 32px 20px;
        position: relative;
    }

    &__date,
    &__header,
    &__title {
        color: var(--dialog-title-text-color);
    }

    &__date {
        display: block;
        font-size: 1.2rem;
        margin-top: 27px;
        text-align: right;
    }

    &__edit {
        position: absolute;
        right: 20px;
        top: -30px;
    }

    &__fig {
        height: 212px;
        overflow: hidden;
        position: relative;
    }

    &__title,
    &__header,
    &__year {
        font-size: 1.8rem;
    }

    &__title,
    &__subtitle,
    &__text,
    &__year {
        font-weight: var(--weight-medium);
    }

    &__header {
        font: {
            size: 1.8rem;
            weight: var(--weight-normal);
        }
        margin-top: 45px;
    }

    &__icons {
        display: flex;
        margin-top: 12px;

        &-item {
            &:not(:first-child) {
                margin-left: 12px;
            }

            &--collection,
            &--fourkay,
            &--hd,
            &--movie,
            &--sd,
            &--tv {
                @extend %hide-text;
                height: 24px;
                width: 24px;
            }

            &--collection {
                background: transparent url('../assets/icons/collections.svg') center center/24px no-repeat;
            }

            &--fourkay {
                background: transparent url('../assets/icons/4k.svg') center center/24px no-repeat;
            }

            &--hd {
                background: transparent url('../assets/icons/hd.svg') center center/24px no-repeat;
            }

            &--movie {
                background: transparent url('../assets/icons/movie.svg') center center/22px no-repeat;
            }

            &--sd {
                background: transparent url('../assets/icons/sd.svg') center center/24px no-repeat;
            }

            &--tv {
                background: transparent url('../assets/icons/tv.svg') center center/24px no-repeat;
            }
        }
    }

    &__img {
        position: absolute;
        height: 100vh;
        object-fit: cover;
        top: -50%;
        width: 100vw;
    }

    &__subtitle,
    &__text,
    &__year {
        color: var(--dialog-text-color)
    }

    &__subtitle {
        font-size: 1.4rem;
        margin-top: 16px;
    }

    &__text {
        line-height: 1.28;
        margin-top: 15px;
    }

    &__year {
        margin-left: 9px;
    }

    // Modifier(s)
    &--open {
        top: 52px;
        transform: translateY(0);
        transition: all .2s cubic-bezier(.65,.05,.36,1);;
    }
}
</style>