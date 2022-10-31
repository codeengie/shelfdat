<template>
    <!-- @todo Convert image icons into a font -->
    <nav class="navbar" :class="isMobileOrTablet">
        <ul class="navbar__list">
            <li class="navbar__list-item">
                <router-link to="/dashboard" class="navbar__link">
                    <span class="navbar__text">Dashboard</span>
                    <img
                        alt="Dashboard"
                        class="navbar__icon"
                        height="22"
                        src="../assets/icons/dashboard.svg"
                        width="22">
                </router-link>
            </li>
            <li class="navbar__list-item">
                <router-link to="/inventory" class="navbar__link">
                    <span class="navbar__text">Inventory</span>
                    <img
                        alt="Inventory"
                        class="navbar__icon"
                        height="22"
                        src="../assets/icons/inventory.svg"
                        width="22">
                </router-link>
            </li>
            <li class="navbar__list-item" v-if="userInfo.role === 'superadmin'">
                <router-link to="/create" class="navbar__link">
                    <span class="navbar__text">Add Item</span>
                    <img
                        alt="Add Item"
                        class="navbar__icon"
                        height="22"
                        src="../assets/icons/library_add.svg"
                        width="22">
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { isMobile } from 'mobile-device-detect';

export default {
    name: 'NavBar',
    computed: {
        ...mapGetters(['userInfo']),
        isMobileOrTablet() {
            return isMobile ? 'navbar--sticky': '';
        }
    }
}
</script>

<style lang="scss" scoped>
$nav-height: 60px;

.navbar {
    $self: &;
    background-color: var(--navbar-bg);
    grid-area: navbar;
    height: $nav-height;
    z-index: 10;

    &__icon {
        height: 22px;
        width: 22px;
    }

    &__link {
        align-items: center;
        background-color: var(--navbar-bg);
        display: flex;
        height: 100%;
        justify-content: center;
        transition: background-color .2s ease-in;
        width: 100%;

        &:hover {
            background-color: var(--navbar-hover);
            transition: background-color .5s ease-out;
        }

        // These classes are added by Vue Router
        // @link https://codepen.io/sosuke/pen/Pjoqqp
        &.router-link-active,
        &.router-link-exact-active {
            #{$self}__icon {
                //filter: invert(16%) sepia(76%) saturate(2869%) hue-rotate(210deg) brightness(94%) contrast(105%);
            }
        }
    }

    &__list {
        display: flex;
        justify-content: center;
        list-style: none;
        width: 100%;

        &-item {
            display: flex;
            flex: 2 1 auto;
            height: $nav-height;
        }
    }

    &__text {
        display: none;
    }

    // Modifier(s)
    &--sticky {
        bottom: 0;
        position: fixed;
        width: 100%;
    }
}
</style>