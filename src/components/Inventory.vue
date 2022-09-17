<template>
    <div class="inventory-item">
        <figure class="inventory-item__pic" :class="setFormat">
            <img
                alt="Image of an inventory item"
                class="inventory-item__pic-poster"
                height="120"
                loading="lazy"
                :src="setImage"
                width="100">
        </figure>
        <div class="inventory-item__wrap">
            <h2 class="inventory-item__type">{{ type }}</h2>
            <h1 class="inventory-item__title" :title="title">{{ title }}</h1>
            <ul class="inventory-item__list">
                <li class="inventory-item__list-item inventory-item__list-item--format">{{ format }}</li>
                <li class="inventory-item__list-item inventory-item__list-item--location">
                    {{ `${location} - Container #${container}` }}
                </li>
            </ul>
            <details class="inventory-item__details" v-if="notes">
                <summary class="inventory-item__summary">Details</summary>
                <p class="inventory-item__notes">{{ notes }}</p>
            </details>
        </div>
        <time
            v-if="created"
            :datetime="Date.parse(created)"
            class="inventory-item__created">Created - {{ prettifyDate }}
        </time>
        <nas-actions v-bind="$attrs"></nas-actions>
    </div>
</template>

<script>
export default {
    name: 'Inventory',
    props: {
        container: Number,
        created: String,
        format: String,
        image: String,
        location: String,
        notes: String,
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
        setFormat() {
            let formatModifier;

            switch (this.format) {
                case 'DVD':
                    formatModifier = 'dvd';
                    break;
                case 'Blu-ray':
                    formatModifier = 'hdx';
                    break;
                case '4K Blu-ray':
                    formatModifier = 'uhd'
            }
            return `inventory-item__pic--${formatModifier}`;
        },
        setImage() {
            return this.image ? `${process.env.VUE_APP_S3_BUCKET_URL}images/inventory/posters/${this.image}` : 'images/placeholder.svg';
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
        areas: 'poster content content' 'created created actions';
        columns: 96px auto auto;
        rows: auto;
    }
    padding: 10px 10px 0;

    &__created {
        align-self: center;
        grid-area: created;
    }

    &__details {
        margin-top: 6px;
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

    &__notes {
        font-size: 1.2rem;
        padding-top: 4px;
    }

    &__pic {
        border-radius: 4px;
        grid-area: poster;
        height: 120px;
        overflow: hidden;
        position: relative;
        width: 100px;

        &::after,
        &::before {
            left: 0;
            position: absolute;
            width: 100px;
        }

        &::after {
            bottom: 0;
            content: '';
            height: 6px;
        }

        &::before {
            color: #fff;
            font-size: 10px;
            height: 14px;
            text-align: center;
            top: 0;
        }

        &-poster {
            height: 120px;
            width: 100px;
        }

        // Modifiers
        &--dvd {
            &::after,
            &::before {
                background-color: #daa520;
            }

            &::before {
                content: 'DVD'
            }
        }

        &--hdx {
            &::after,
            &::before {
                background-color: #0095d5;
            }

            &::before {
                content: 'BLU-RAY'
            }
        }

        &--uhd {
            &::after,
            &::before {
                background-color: #000;
            }

            &::before {
                content: '4K UHD';
            }
        }
    }

    &__summary {
        cursor: pointer;
        font: {
            size: 1.2rem;
            weight: var(--weight-bold);
        }
    }

    &__title {
        font: {
            size: 1.8rem;
            weight: var(--weight-bold);
        }
        // Hacky but will keep for now to limit title to two lines
        display: -webkit-box;
        overflow: hidden;
        -webkit: {
            box-orient: vertical;
            line-clamp: 2;
        }
        // End hacky code
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