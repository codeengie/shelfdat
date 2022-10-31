<template>
    <nas-header v-if="this.$route.meta.header"></nas-header>
    <main class="main">
        <router-view></router-view>
    </main>
    <NavBar v-if="this.$route.meta.navbar"/>
</template>

<style lang="scss">
@import './styles/vars';
@import './styles/reboot';
@import './styles/global';

#app {
    display: grid;
    grid-template: {
        areas: 'header' 'main' 'navbar';
        rows: auto 1fr auto;
    }
    height: 100vh;
}

.main {
    grid-area: main;
    position: relative;
    overflow: auto;
}
</style>