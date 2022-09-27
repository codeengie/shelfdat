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

// @todo Remove once redesign is done
:root {
    // Color scheme
    --alabaster: #e9e9e9;
    --alto: #d6d6d6;
    --black: #000000;
    --dodger-blue: #00b9ff;
    --dove-gray: #707070;
    --golden-tainoi: #feb914;
    --mandy: #e34850;
    --persian-blue: #2346d4;
    --picton-blue: #36a2eb;
    --white: #ffffff;
    --wild-watermelon: #ff6384;

    // Site wide
    --bg-main-color: var(--white);
    --bg-color: var(--alabaster);
}

#app {
    display: grid;
    grid-template: {
        areas: 'header' 'main' 'navbar';
        columns: 1fr;
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