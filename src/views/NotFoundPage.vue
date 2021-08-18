<template>
    <div class="not-found">
        <h1 class="not-found__header">
            <span class="not-found__header-main">404 Page Not Found</span>
            <span class="not-found__header-subtitle">There was a glitch in the Matrix!</span>
        </h1>
        <p class="not-found__text">We could&rsquo;t find the page you are looking, but don't fret sometimes getting lost is a good thing.</p>
    </div>
</template>

<script>
export default {
    name: "NotFoundPage"
}
</script>

<style lang="scss" scoped>
.not-found {
    text-align: center;

    &__header {
        &-main,
        &-subtitle {
            display: block;
        }

        &-main {
            font-size: 2.6rem;
        }

        &-subtitle {
            font-size: 1.8rem;
        }
    }
}
</style>