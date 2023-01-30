<template>
    <div class="recent">
        <h2 class="recent__title">Recent</h2>

        <Carousel :settings="settings" :breakpoints="breakpoints">
            <Slide v-for="slide in displayNum" :key="slide">
                <div class="carousel__item">
                    <Poster
                        :poster-id="filterRecent[slide - 1].id"
                        :poster-src="filterRecent[slide - 1].imageurl"
                        poster-height="162"
                        :poster-title="filterRecent[slide - 1].title"
                        poster-width="108"
                        :poster-year="filterRecent[slide - 1].year"/>
                </div>
            </Slide>
            <template #addons>
                <Navigation/>
            </template>
        </Carousel>
    </div>
</template>

<script>
import Poster from './Poster';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

export default {
    name: 'Recent',
    components: {
        Carousel,
        Navigation,
        Poster,
        Slide
    },
    data() {
        return {
            breakpoints: {
                0: {
                    itemsToShow: 3.5,
                    snapAlign: 'center'
                },
                768: {
                    itemsToShow: 4.5,
                    snapAlign: 'center'
                },
                992: {
                    itemsToShow: 5,
                    snapAlign: 'center'
                }
            },
            settings: {
                itemsToShow: 1,
                snapAlign: 'center'
            }
        };
    },
    props: {
        dbData: Object,
        displayNum: Number
    },
    computed: {
        filterRecent() {
            let filteredData = this.dbData.filter(inventory => inventory['createdate'] !== undefined);
            filteredData = filteredData.sort((a, b) => new Date(a.createdate) - new Date(b.createdate)).reverse().slice(0, this.displayNum);
            return filteredData;
        }
    }
}
</script>

<style lang="scss">
.carousel {
    &__icon {
        fill: var(--white);
    }

    &__next,
    &__prev {
        background: var(--dark-shark);
    }
}
</style>

<style lang="scss" scoped>
.carousel {
    margin-top: 12px;

    &__slide {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }
    }
}

.recent {
    padding: 0 15px;

    &__title {
        color: var(--secondary-text-color);
        font: {
            size: var(--primary-text-size);
            weight: var(--weight-medium);
        }
    }

    &__wrap {
        display: grid;
        gap: 29px;
        grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
        margin-top: 12px;

        @media (width >= 768px) {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }
    }
}
</style>