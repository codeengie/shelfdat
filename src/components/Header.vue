<template>
    <header class="header">
        <Brand img-height="19" img-width="91"/>
        <AccountMenu/>
    </header>
</template>

<script>
import AccountMenu from './AccountMenu';
import Brand from "./Brand";

export default {
    name: 'Header',
    components: {
        AccountMenu,
        Brand
    }
}
</script>

<style lang="scss" scoped>
.account-menu {
    margin-left: auto;
}

.header {
    align-items: center;
    background-color: var(--woodsmoke);
    display: flex;
    height: 52px;
    margin: 0 var(--block-spacing);
}
</style>