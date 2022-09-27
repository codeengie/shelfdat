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
            <button class="details__edit" @click="edit">Edit</button>
            <h2 class="details__title">{{ titles[0] }} <span class="details__year">{{ titles[2] }}</span></h2>
            <h3 class="details__subtitle">{{ titles[1] }}</h3>
            <ul class="details__icons">
                <li class="details__icons-item" :class="rez" :title="format">{{ format }}</li>
                <li class="details__icons-item" :class="typeSet" :title="type">{{ type }}</li>
                <li class="details__icons-item details__icons-item--collection"
                    v-if="collection" title="Collection">Collection</li>
            </ul>
            <h4 class="details__header">Location</h4>
            <p class="details__text">{{ location }}<span class="details__bullet">Bin:</span> {{ bin }}</p>

            <h4 class="details__header">Notes</h4>
            <p class="details__text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit.</p>

            <time class="details__date" datetime="2022-09-17T18:36:22.473Z">{{ prettyDate }}</time>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Details',
    props: {
        bin: Number,
        collection: Boolean,
        format: String,
        imgSrc: String,
        location: String,
        title: String,
        timestamp: String,
        type: String
    },
    data() {
        return {
            isDialogOpen: false
        }
    },
    computed: {
        dialogMod() {
            return this.isDialogOpen ? 'details--open' : '';
        },
        prettyDate() {
            if (this.timestamp) {
                const newDate = new Date(this.timestamp).toDateString().split(' ');
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
            return this.imgSrc ? `${process.env.VUE_APP_S3_BUCKET_URL}images/inventory/posters/${this.imgSrc}` : 'images/placeholder.svg';
        },
        titles() {
            return this.title.split(/[:(]/).map(title => {
                return (/[)]/.test(title)) ? title = '('.concat(title) : title.trim();
            });
        },
        typeSet() {
            let modifier = 'details__icons-item--';
            return this.type.toLocaleLowerCase() === 'movie' ? `${modifier}movie` : `${modifier}tv`;
        }
    },
    methods: {
        edit() {
            console.log('Edit');
        },
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
    //height: 0;
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
        background: transparent url('/images/icons/arrow.svg') 0 0/20px no-repeat;
        height: 20px;
        left: 20px;
        position: absolute;
        top: 26px;
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
        margin-top: 28px;
        text-align: right;
    }

    &__edit {
        @extend %hide-text;
        background: var(--cobalt) url('/images/icons/edit.svg') center center/26px no-repeat;
        border-radius: 50%;
        height: 60px;
        position: absolute;
        right: 20px;
        top: -30px;
        width: 60px;
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
        margin-top: 30px;
    }

    &__icons {
        display: flex;
        margin-top: 18px;

        &-item {
            &:not(:first-child) {
                margin-left: 10px;
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
                background: transparent url('/images/icons/collections.svg') center center/24px no-repeat;
            }

            &--fourkay {
                background: transparent url('/images/icons/4k.svg') center center/24px no-repeat;
            }

            &--hd {
                background: transparent url('/images/icons/hd.svg') center center/24px no-repeat;
            }

            &--movie {
                background: transparent url('/images/icons/movie.svg') center center/24px no-repeat;
            }

            &--sd {
                background: transparent url('/images/icons/sd.svg') center center/24px no-repeat;
            }

            &--tv {
                background: transparent url('/images/icons/tv.svg') center center/24px no-repeat;
            }
        }
    }

    &__img {
        position: absolute;
        height: 100vh;
        //inset: 0;
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
        margin-top: 20px;
    }

    &__text {
        margin-top: 12px;
    }

    &--open {
        //height: 100%;
        top: 52px;
        transform: translateY(0);
        transition: all .2s cubic-bezier(.65,.05,.36,1);;
    }
}
</style>