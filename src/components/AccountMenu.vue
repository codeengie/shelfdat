<template>
    <div class="account-menu">
        <img class="account-menu__pic" src="images/account_circle-24px.svg" width="20" height="20" alt="Simple humanoid upper body surrounded by a black circle">
        <p class="account-menu__user">Hi, <span>CodeEngie</span></p>
        <div class="account-menu__drawer">
            <ul class="account-menu__drawer-list">
                <li class="account-menu__drawer-item"><a href="#" @click="logout()">Logout</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'AccountMenu',
    data() {
        return {

        }
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>

<style lang="scss" scoped>
.account-menu {
    align-items: center;
    display: flex;
    height: 38px;
    justify-content: center;
    position: relative;

    &__drawer {
        left: 0;
        position: absolute;
        top: 38px;

        &-item {
            list-style: none;
        }
    }

    &__user {
        font: {
            size: 1.2rem;
            weight: var(--weight-medium);
        }
        padding-left: 6px;
        white-space: nowrap;
    }
}
</style>