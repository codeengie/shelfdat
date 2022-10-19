<template>
    <div class="recent">
        <h2 class="recent__title">Recent Additions</h2>
        <div class="recent__wrap">
            <Poster
                v-for="dataItem in filterRecent"
                :key="dataItem.id"
                :poster-id="dataItem.id"
                :poster-src="dataItem.imageurl"
                poster-height="162"
                :poster-title="dataItem.title"
                poster-width="108"/>
        </div>
    </div>
</template>

<script>
import Poster from './Poster';

export default {
    name: 'Recent',
    components: {
        Poster
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

<style lang="scss" scoped>
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
        grid-template-columns: repeat(auto-fit, minmax(108px, 1fr));
        margin-top: 12px;
    }
}
</style>