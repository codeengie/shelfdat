<template>
    <header class="header">
        <div class="menu">
            <img src="images/menu-24px.svg" width="18" height="18" alt="Hamburger menu">
        </div>
        <div class="brand">
            <h1 class="brand__header">{{ titleLogo }}</h1>
        </div>
        <div class="login">
            <img src="images/account_circle-24px.svg" width="20" height="20" alt="Simple humanoid upper body surrounded by a black circle">
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                titleLogo: process.env.VUE_APP_TITLE
            }
        }
    }
</script>

<style lang="scss">
:root {
    --header-bg-color: #fff;
    --header-height: 38px;
}

.brand {
    text-align: center;
    width: 100%;

    &__logo,
    &__subheader {
        display: none;
    }

    &__header {
        font: {
            size: 1.2rem;
            weight: 700;
        }
    }
}

.login,
.menu {
    align-items: center;
    display: flex;
}

.login {
    height: var(--header-height);
    width: 20px;
}

.menu {
    height: var(--header-height);
    width: 18px;
}

.header {
    align-items: center;
    background-color: var(--header-bg-color);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    display: flex;
    // flex: none;
    height: var(--header-height);
    justify-content: center;
    padding: 0 15px;
}
</style>