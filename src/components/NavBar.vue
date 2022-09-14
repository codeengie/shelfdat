<template>
    <!-- @todo Convert image icons into a font -->
    <nav class="navbar">
        <ul class="navbar__list">
            <li class="navbar__list-item">
                <router-link to="/dashboard" class="navbar__link">
                    <span class="navbar__text">Dashboard</span>
                    <img class="navbar__icon" src="images/dashboard_48p.svg" alt="Dashboard">
                </router-link>
            </li>
            <li class="navbar__list-item">
                <router-link to="/inventory" class="navbar__link">
                    <span class="navbar__text">Inventory</span>
                    <img class="navbar__icon" src="images/inventory_48p.svg" alt="Inventory">
                </router-link>
            </li>
            <li class="navbar__list-item">
                <a href="#" class="navbar__link">
                    <span class="navbar__text">Add Item</span>
                    <img class="navbar__icon" src="images/library_add_48p.svg" alt="Add Item">
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style lang="scss" scoped>
$nav-bg: #2e2e2e;
$nav-height: 60px;

.navbar {
    $self: &;
    background-color: $nav-bg;
    grid-area: navbar;
    height: $nav-height;

    &__icon {
        filter: invert(38%);
        height: 32px;
        width: 32px;
    }

    &__link {
        align-items: center;
        background-color: $nav-bg;
        display: flex;
        height: 100%;
        justify-content: center;
        transition: background-color .2s ease-in;
        width: 100%;

        &:hover {
            background-color: darken($nav-bg, 10%);
            transition: background-color .5s ease-out;
        }

        // These classes are added by Vue Router
        &.router-link-active,
        &.router-link-exact-active {
            #{$self}__icon {
                filter: invert(100%);
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
}
</style>