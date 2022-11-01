<template>
    <div class="app__wrap" :class="{ 'app__wrap--mobile': mobileDevice }">
        <nas-header v-if="this.$route.meta.header"></nas-header>
        <main class="app__main">
            <router-view></router-view>
        </main>
        <NavBar v-if="this.$route.meta.navbar"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    computed: {
        ...mapGetters(['mobileDevice'])
    }
}
</script>

<style lang="scss">
@import './styles/vars';
@import './styles/reboot';
@import './styles/global';

.app {
    &__main {
        grid-area: main;
        position: relative;
        overflow: auto;
    }

    &__wrap {
        display: grid;
        grid-template: {
            areas: 'header' 'main' 'navbar';
            rows: auto 1fr auto;
        }
        height: 100vh;

        &--mobile {
            padding-bottom: 60px;
        }
    }
}
</style>

<!-- Necessary evil to affect child component styles -->
<style lang="scss" scoped>
.app {
    &__wrap {
        // Modifier(s)
        &--mobile {
            :deep(.navbar) {
                bottom: 0;
                position: fixed;
                width: 100%;
            }
        }
    }
}
</style>