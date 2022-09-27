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
            <ul></ul>
            <h4 class="details__header">Location</h4>
            <p class="details__text">{{ location }} - Bin: {{ bin }}</p>

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
        bin: String,
        imgSrc: String,
        location: String,
        title: String,
        timestamp: String,
    },
    data() {
        return {
            isDialogOpen: false
        }
    },
    computed: {
        prettyDate() {
            if (this.timestamp) {
                const newDate = new Date(this.timestamp).toDateString().split(' ');
                return `${newDate[1]} ${newDate[2]}, ${newDate[3]}`;
            } else {
                return 'No date available';
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
        dialogMod() {
            return this.isDialogOpen ? 'details--open' : '';
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
    height: 0;
    inset: 0; // Equivalent to top, right, bottom, left = 0
    overflow: hidden;
    position: fixed;
    transition: all .2s ease-in;
    transform: translateY(100%);

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

    &__title {
        //margin-top: 32px;
    }

    &--open {
        height: 100%;
        top: 52px;
        transform: translateY(0);
        transition: all .2s ease-out;
    }
}
</style>