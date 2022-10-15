<template>
    <div class="context-menu" :class="menuMod">
        <button class="context-menu__button" @click="toggleMenu"><span class="context-menu__button-line"></span></button>
        <button class="context-menu__item context-menu__item--edit" @click="editItem()">
            <span class="context-menu__icon"></span>
        </button>
        <button class="context-menu__item context-menu__item--delete" @click="deleteItem()">
            <span class="context-menu__icon"></span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    data() {
        return {
            isMenuOpen: false
        }
    },
    computed: {
        menuMod() {
            return this.isMenuOpen ? 'context-menu--open' : '';
        }
    },
    methods: {
        deleteItem() {
            console.log('Delete item');
        },
        editItem() {
            console.log('Edit item');
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    }
}
</script>

<style>
.context-menu {
    position: relative;
}
</style>

<style lang="scss" scoped>
$weenie-width: 32px;
$weenie-height: 4px;
$bun-space: 10px;
$bun-width: calc($weenie-width - 12px);
$menu-diameter: 60px;
$item-diameter: calc($menu-diameter / 1.4);

.context-menu {
    $self: &;
    align-items: center;
    display:flex;
    height: $menu-diameter;
    justify-content: center;
    width: $menu-diameter;

    &__button {
        align-items: center;
        background-color: var(--cobalt);
        border-radius: 50%;
        display: flex;
        height: $menu-diameter;
        justify-content: center;
        overflow: hidden;
        scale: 1;
        transition: all .2s ease;
        width: $menu-diameter;
        z-index: 1;

        &-line {
            background-color: var(--white);
            display: flex;
            height: $weenie-height;
            justify-content: center;
            position: relative;
            width: $weenie-width;

            &::after,
            &::before {
                background-color: var(--white);
                content: '';
                display: block;
                height: $weenie-height;
                position: absolute;
                transition: all .2s ease-out;
                width: $bun-width;
            }

            &::after {
                top: $bun-space;
            }

            &::before {
                bottom: $bun-space;
            }
        }

        &:hover {
            scale: 1.1;

            #{$self}__button-line {
                &::after,
                &::before {
                    transition: all .4s cubic-bezier(.4, 1.74, .65, .93);
                }

                &::after {
                    transform: translateY(-4px);
                }

                &::before {
                    transform: translateY(4px);
                }
            }
        }
    }

    &__icon {
        display: block;
        height: 18px;
        width: 18px;
    }

    &__item {
        align-items: center;
        background-color: var(--cobalt);
        border-radius: 50%;
        display: flex;
        height: $item-diameter;
        justify-content: center;
        position: absolute;
        transition: all .2s ease;
        width: $item-diameter;

        &:hover {
            scale: 1.2;
        }

        // Modifier(s)
        &--delete {
            #{$self}__icon {
                background: transparent url('../assets/icons/delete.svg') center center no-repeat;
            }
        }

        &--edit {
            #{$self}__icon {
                background: transparent url('../assets/icons/edit.svg') center center no-repeat;
            }
        }
    }

    // Modifier(s)
    &--open {
        #{$self} {
            &__button {
                background-color: var(--shark);
                rotate: 90deg;
                scale: .8;
                transition: all .4s ease;

                &-line,
                &-line::after,
                &-line::before {
                    background-color: var(--dusty-gray);
                }
            }

            &__item {
                transition: all .4s ease;

                &--delete {
                    translate: 0 80px;
                }

                &--edit {
                    translate: 0 -80px;
                }
            }
        }
    }
}
</style>