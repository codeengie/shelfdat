<template>
  <div class="modwrap">
    <h2 class="modwrap__title" v-if="$slots.heading"><slot name="heading"></slot></h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ModWrap"
}
</script>

<style lang="scss" scoped>
  .modwrap {
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
</style>