<template>
    <div class="inventory-item">
        <figure class="inventory-item__pic">
            <img
                alt="Image of an inventory item"
                class="inventory-item__pic-poster"
                height="121"
                loading="lazy"
                :src="setImage"
                width="96">
        </figure>
        <div class="inventory-item__wrap">
            <h2 class="inventory-item__type">{{ type }}</h2>
            <h1 class="inventory-item__title">{{ title }}</h1>
            <ul class="inventory-item__list">
                <li class="inventory-item__list-item inventory-item__list-item--format">{{ format }}</li>
                <li class="inventory-item__list-item inventory-item__list-item--location">{{ `${location} - Container #${container}` }}</li>
            </ul>
            <!--<details class="inventory-item__details" v-if="created">
                <summary class="inventory-item__summary">Details</summary>
            </details>-->
        </div>
        <time
            v-if="created"
            :datetime="Date.parse(created)"
            class="inventory-item__created">Created - {{ prettifyDate }}</time>
        <nas-actions v-bind="$attrs"></nas-actions>
    </div>
</template>

<script>
export default {
    name: "Inventory",
    props: {
        container: String,
        created: String,
        format: String,
        image: String,
        location: String,
        title: String,
        type: String
    },
    computed: {
        prettifyDate() {
            const newDate = new Date(this.created).toDateString();
            const pattern = /^([A-Za-z]{3})\s([A-Za-z]{3})\s([0-9]{2})\s([0-9]{4})/g;
            const dateGroup = pattern.exec(newDate);
            return `${dateGroup[2]} ${dateGroup[3]}, ${dateGroup[4]}`;
        },
        setImage() {
            return this.image ? `images/${this.image}` : 'images/placeholder.svg'
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    grid-area: actions;
}

.inventory-item {
    // background-color: var(--alabaster);
    background-color: #f0f0f0; // @todo Remove and enable alabaster color
    border-radius: 12px;
    display: grid;
    column-gap: 26px;
    grid-template: {
        areas: 'poster content content'
                'created created actions';
        columns: 96px auto auto;
        rows: auto;
    }
    padding: 10px 10px 0;

    &__created {
        align-self: center;
        grid-area: created;
    }

    &__list {
        margin-top: 8px;

        &-item {
            font-size: 1.2rem;
            list-style: none;
            padding-left: 18px;
            position: relative;

            &::before {
                background: {
                    color: transparent;
                    position: 0 0;
                    repeat: no-repeat;
                    size: cover;
                }
                content: '';
                height: 12px;
                left: 0;
                position: absolute;
                top: 0;
                width: 12px;
            }

            &:not(:first-child) {
                margin-top: 4px;
            }

            &--format {
                &::before {
                    background-image: url('/images/save_black_48dp.svg');
                }
            }

            &--location {
                &::before {
                    background-image: url('/images/location_black_48dp.svg');
                }
            }
        }
    }

    &__pic {
        grid-area: poster;

        &-poster {
            border-radius: 4px;
        }
    }

    &__title {
        font: {
            size: 1.8rem;
            weight: var(--weight-bold);
        }
    }

    &__type {
        font: {
            size: 1rem;
            weight: var(--weight-normal);
        }
        text-transform: uppercase;
    }

    &__wrap {
        grid-area: content;
    }
}
</style>