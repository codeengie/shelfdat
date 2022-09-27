<template>
    <div class="account-menu">
        <img class="account-menu__pic" :src="profileImage(userInfo.picture)" width="20" height="20" alt="Simple humanoid upper body surrounded by a black circle">
        <p class="account-menu__user"><span>{{ userInfo.username }}</span></p>
        <div class="account-menu__drawer">
            <div class="account-menu__drawer-profile">
                <span class="account-menu__drawer-name">{{ userInfo.name }}</span>
                <span class="account-menu__drawer-email">{{ userInfo.email }}</span>
            </div>
            <ul class="account-menu__drawer-list">
                <li class="account-menu__drawer-item">
                    <a class="account-menu__drawer-link account-menu__drawer-link--account" href="#">Account</a>
                </li>
                <li class="account-menu__drawer-item">
                    <a class="account-menu__drawer-link account-menu__drawer-link--logout" href="#" @click.prevent="logout()">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'AccountMenu',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        ...mapActions(['logout']),
        profileImage(imageName) {
            return imageName ? `${process.env.VUE_APP_S3_BUCKET_URL}images/users/codeengie/${imageName}` : 'images/icons/account_circle.svg';
        }
    }
}
</script>

<style lang="scss" scoped>
.account-menu {
    $this: &;
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 38px;
    justify-content: center;
    position: relative;

    &:hover {
        #{$this}__drawer {
            display: block;
        }
    }

    &__drawer {
        background: var(--account-menu-bg-color);
        border-radius: 12px;
        display: none;
        padding: 20px;
        position: absolute;
        right: 0;
        top: 38px;
        z-index: 2;

        &-email,
        &-name {
            display: block;
            white-space: nowrap;
        }

        &-email {
            color: var(--account-menu-subtext-color);
            font: {
                size: 1.2rem;
                weight: var(--weight-medium);
            }
            margin-top: 4px;
        }

        &-item {
            list-style: none;

            &:not(:first-child) {
                margin-top: 4px;
            }
        }

        &-link {
            align-items: center;
            border-radius: 4px;
            display: flex;
            font: {
                size: 1.4rem;
                weight: var(--weight-medium);
            }
            padding: 4px;
            text-decoration: none;
            transition: all .2s ease-out;

            &:active,
            &:link,
            &:visited {
                color: var(--account-menu-text-color);
            }

            &:hover {
                background-color: var(--account-menu-hover-color);
                transition: all .3s ease-in;
            }

            &--account,
            &--logout {
                &::before {
                    content: '';
                    display: block;
                    height: 22px;
                    margin-right: 6px;
                    width: 22px;
                }
            }

            &--account {
                &::before {
                    background: transparent url('/images/icons/account.svg') 0 0/22px no-repeat;
                }
            }

            &--logout {
                &::before {
                    background: transparent url('/images/icons/logout.svg') 0 0/22px no-repeat;
                }
            }
        }

        &-list {
            margin-top: 16px;
        }

        &-name {
            color: var(--account-menu-text-color);
            font: {
                size: 1.6rem;
                weight: var(--weight-bold);
            }
        }
    }

    &__user {
        color: var(--account-menu-text-color);
        font: {
            size: 1.2rem;
            weight: var(--weight-medium);
        }
        padding-left: 6px;
        white-space: nowrap;
    }
}
</style>