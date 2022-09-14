<template>
    <div class="line-loader"></div>
</template>

<script>
export default {
    name: 'LineLoader'
}
</script>

<style lang="scss" scoped>
$loader-height: 3px;

.line-loader {
    background-color: #ddd;
    height: $loader-height;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::before {
        animation: lineAnime 1s linear infinite;
        background-color: coral;
        content: '';
        height: $loader-height;
        left: -50%;
        position: absolute;
        width: 40%;
    }

    @keyframes lineAnime {
        0% {
            left: -40%;
        }
        50% {
            left: 20%;
            width: 80%;
        }
        100% {
            left: 100%;
            width: 100%
        }
    }
}
</style>