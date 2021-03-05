<template>
  <div class="stat">
    <h3 class="stat__title">{{ title }}</h3>
    <h4 class="stat__reading">{{ statCounter.length }}</h4>
  </div>
</template>

<script>
  export default {
    props: {
      dbData: Object,
      title: String,
      filterBy: String,
      filterKey: String
    },
    data() {
      return {
        statNum: 0
      };
    },
    computed: {
      statCounter() {
        return this.dbData.filter(data => {
          return data[this.filterBy] === this.filterKey;
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .stat {
    display: flex;
    flex-direction: column-reverse;
    padding: 0 15px;
    text-align: center;

    &:last-child,
    &:nth-last-child(2) {
      margin-top: 16px;
    }

    &__reading {
      font: {
        size: 1.8rem;
        weight: 500;
      }
    }

    &__title {
      font: {
        size: 1.2rem;
        weight: 500;
      }
      margin: {
        bottom: 10px;
        top: 8px;
      }
      letter-spacing: .4px;
      text-transform: uppercase;
    }
  }
</style>