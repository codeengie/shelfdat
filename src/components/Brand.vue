<template>
    <h1 class="brand">
        <img
            :height="imgHeight"
            :width="imgWidth"
            alt="ShelfDat logo"
            class="logo__img"
            src="images/logo.svg">
    </h1>
</template>

<script>
export default {
    name: 'Brand',
    props: {
        imgHeight: String,
        imgWidth: String
    }
}
</script>

<style lang="scss" scoped></style>