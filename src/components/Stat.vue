<template>
  <!--<div class="stat">
    <h3 class="stat__title">{{ statTitle }}</h3>
    <h4 class="stat__reading">{{ statCount.length }}</h4>
  </div>-->

  <div class="stats">
    <h2 class="stats__title">{{ header }}</h2>
    <div class="stat" v-for="module in modules" :key="module">
      <h3 class="stat__title">{{ module.title }}</h3>
      <!--<h4 class="stat__reading">{{ statCounter(module.key, module.filter) }}</h4>-->
      <h4 class="stat__reading">{{ statCount }}</h4>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object,
      modules: Object,
      header: String
    },
    data() {
      return {};
    },
    computed: {
      statCount() {
        return this.data.length;
      }
      /*statCounter(key, filter) {
        return this.data.filter(word => {
          return word[key] === filter;
        });
      }*/
      /*statCount() {
        return this.dataToFilter.filter(data => {
          // return data[this.statKey].includes(this.statFilter);
          return data[this.statKey] === this.statFilter;
        });
      }*/
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .stats {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    &__title {
      font: {
        size: 1.8rem;
        weight: 500;
      }
      margin: 8px 0;
      padding: 0 15px;
      text-align: center;
      width: 100%;
    }
  }

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