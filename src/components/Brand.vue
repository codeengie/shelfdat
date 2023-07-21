<template>
    <h1 class="brand">
        <img
            :height="imgHeight"
            :width="imgWidth"
            alt="ShelfDat logo"
            class="brand__img"
            src="../assets/global/logo.svg">
    </h1>
</template>

<script>
export default {
    name: 'Brand',
    props: {
      imgHeight: {
        required: true,
        type: String
      },
      imgWidth: {
        required: true,
        type: String
      }
    }
}
</script>

<style lang="scss" scoped>
.brand {
    &__img {
        display: inline;
    }
}
</style>