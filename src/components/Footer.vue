<template>
    <footer class="footer">
        <small class="footer__text">Copyright {{ setCurrentYear }} @ Ardent Forms. All Rights Reserved.</small>
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
    },
    methods: {}
}
</script>

<style lang="scss">
.footer {
    font: {
        size: 1.2rem;
        weight: 400;
    }
    flex: none;
    text-align: center;
}
</style>