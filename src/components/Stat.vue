<template>
  <div class="stat">
    <h3 class="stat__title">{{ statTitle }}</h3>
    <h4 class="stat__reading">{{ statCount.length }}</h4>
  </div>
</template>

<script>
  export default {
    props: {
      statFilter: {
        type: String,
        required: true
      },
      statKey: {
        type: String,
        required: true
      },
      statTitle: {
        type: String,
        required: true
      },
      dataToFilter: Object
    },
    data() {
      return {};
    },
    computed: {
      statCount() {
        return this.dataToFilter.filter(data => {
          // return data[this.statKey].includes(this.statFilter);
          return data[this.statKey] === this.statFilter;
        });
      }
    },
    methods: {}
  }
</script>
<style lang="scss">
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