<template>
    <div class="latest">
        <h2 class="latest__title">Latest</h2>
        <div class="latest__wrap">
            <figure class="latest__item" v-for="dataItem in filterLatest" :key="dataItem">
                <img
                    class="latest__pic"
                    height="147"
                    loading="lazy"
                    :src="setImage(dataItem.imageurl)"
                    width="100">
            </figure>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LatestItems',
    props: {
        dbData: Object,
        displayNum: Number
    },
    computed: {
        filterLatest() {
            let filteredData = this.dbData.filter(inventory => inventory['createdate'] !== undefined);
            filteredData = filteredData.sort((a, b) => new Date(a.createdate) - new Date(b.createdate)).reverse().slice(0, this.displayNum);
            return filteredData;
        }
    },
    methods: {
        setImage(imageName) {
            return `${process.env.VUE_APP_S3_BUCKET_URL}${imageName}`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .latest {
        margin-top: 16px;

        &__item {
            float: left;
        }

        &__title {
            font: {
                size: 1.6rem;
                weight: var(--weight-medium);
            }
            padding: 0 15px;
         }

        &__wrap {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 16px;
            padding: 0 15px;
        }
    }
</style>