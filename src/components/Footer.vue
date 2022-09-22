<template>
    <footer class="footer">
        <small class="footer__text">Copyright &copy; {{ setCurrentYear }} Ardent Forms Inc. All Rights Reserved.</small>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            currentYear: null
        };
    },
    computed: {
        setCurrentYear() {
            const date = new Date();
            return date.getFullYear();
        }
    }
}
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;

    &__text {
        font-size: 1.2rem;
    }
}
</style>