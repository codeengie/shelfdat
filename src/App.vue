<template>
    <nas-header v-if="this.$route.meta.header"></nas-header>
    <router-view></router-view>
    <nas-footer></nas-footer>
</template>

<script>
    export default {
        data() {
            return {

            }
        }/*,
        beforeUpdate() {
            console.log(`Route data: ${this.$route.meta.title}`);
        }*/
    }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&family=Roboto:wght@300;400;500;700;900&display=swap');

:root {
    // Color scheme
    --alabaster: #f9f9f9;
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
    // Forms
    --form-btn-bg-color: var(--dodger-blue);
    --form-btn-text-color: var(--white);
    --form-error-color: var(--mandy);
    --form-focus-highlight: var(--persian-blue);
    // Typeface weights
    --weight-light: 300;
    --weight-normal: 400;
    --weight-medium: 500;
    --weight-bold: 700;
    --weight-xbold: 900;
}

*,
*::after,
*::before {
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body, button, figure, dl, h1, h2, h3, h4, p, ul {
    margin: 0;
    padding: 0;
}

body {
    background-color: var(--bg-main-color);
    font-family: Roboto, sans-serif;
}

button {
    border-style: none;
    cursor: pointer;
}

h1 {
    font-size: 3rem;
}

dl, p {
    font-size: 1.6rem;
}

dt {
    font-weight: 500;
}

section {
    padding: 0 15px;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
</style>