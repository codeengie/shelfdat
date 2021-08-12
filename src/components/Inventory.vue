<template>
    <div class="inventory-item">
        <figure class="inventory-item__pic">
            <img src="https://via.placeholder.com/64x96" alt="Movie Poster">
        </figure>
        <div class="inventory-item__wrap">
            <h2 class="inventory-item__type">{{ type }}</h2>
            <h1 class="inventory-item__title">{{ title }}</h1>
            <ul class="inventory-item__list">
                <li class="inventory-item__list-item inventory-item__list-item--format">{{ format }}</li>
                <li class="inventory-item__list-item inventory-item__list-item--location">This movie is located on the {{ location }}</li>
            </ul>
            <details class="inventory-item__details" v-if="created">
                <summary class="inventory-item__summary">Details</summary>
                <time
                    v-if="created"
                    :datetime="Date.parse(created)"
                    class="inventory-item__created">Created: {{ prettifyDate }}</time>
            </details>
        </div>
        <nas-actions v-bind="$attrs"></nas-actions>
    </div>
</template>

<script>
export default {
    name: "Inventory",
    props: {
        created: String,
        format: String,
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
        }
    }
}
</script>

<style lang="scss" scoped>
.actions {
    grid-area: actions;
}

.inventory-item {
    background-color: var(--alabaster);
    display: grid;
    grid-template: {
        areas: 'poster' 'content' 'actions';
        columns: 64px auto 100%;
        rows: auto;
    }
    padding: 10px;

    &__list {
        margin-top: 8px;

        &-item {
            font-size: 1.2rem;
            list-style: none;

            &:not(:first-child) {
                margin-top: 4px;
            }
        }
    }

    &__pic {
        grid-area: poster;
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

/*.inventory-item {
    align-items: stretch;
    background-color: #464646;
    display: flex;
    flex-flow: row wrap;
    height: 164px;
    padding: 10px 15px;
    width: 290px;

    &:not(:first-child) {
        margin-top: 4px;
    }

    &__created {
        color: #fff;
    }

    &__format,
    &__type {
        color: #a8a8a8;
        font: {
            size: 1.2rem;
            weight: 500;
        }
        flex: 1;
        text-transform: uppercase;
    }

    &__format {
        text-align: right;
    }

    &__location {
        color: #a8a8a8;
        font: {
            size: 1.2rem;
            weight: 400;
        }
        margin-top: 12px;
        width: 100%;
    }

    &__title {
        color: #fff;
        font: {
            size: 1.8rem;
            weight: 900;
        }
        margin-top: 6px;
        text-transform: uppercase;
        width: 100%;
    }

    &__type {}
}*/
</style>