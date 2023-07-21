<template>
  <div class="content">
    <Brand img-height="44" img-width="205"/>
    <h2 class="content__title">This Page is {{ pageTitle }}</h2>
    <h3 class="content__subtitle">Check back soon!</h3>
  </div>
</template>

<script>
import Brand from '@/components/Brand.vue';

export default {
  name: 'UnderConstruction',
  components: {Brand},
  data() {
    return {
      pageTitle: this.$route.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 0 20px;

  &__subtitle {
    margin-top: 6px;
  }

  &__title {
    margin-top: 10px;
  }
}
</style>