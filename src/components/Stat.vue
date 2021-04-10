<template>
    <div class="stat" :class="setClasses">
        <template v-if="modifier === 'icon'">
            <div class="stat__wrap">
                <img
                    v-if="modifier === 'icon'"
                    :src="setStatIcon"
                    alt="Icon"
                    class="stat__icon"
                    height="16"
                    width="20">
            </div>
            <div class="stat__wrap">
                <h3 class="stat__title">{{ title }}</h3>
                <h4 class="stat__reading">{{ statCounter.length }}</h4>
            </div>
        </template>
        <template v-else>
            <h3 class="stat__title">{{ title }}</h3>
            <h4 class="stat__reading">{{ statCounter.length }}</h4>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        dbData: Object,
        iconName: String,
        modifier: [Array, String],
        title: String,
        filterBy: String,
        filterKey: String
    },
    data() {
        return {
            statNum: 0
        };
    },
    computed: {
        /*setClass() {
            console.log(`Stat modifier: ${this.modifier}`);
            return this.modifier ? `stat--${this.modifier}` : '';
        },*/
        setClasses() {
            let classesToSet = '';

            if (Array.isArray(this.modifier)) {
                this.modifier.forEach(element => {
                    classesToSet += `stat--${element} `;
                });
            } else {
                classesToSet = this.modifier ? `stat--${this.modifier}` : '';
            }

            return classesToSet;
        },
        setStatIcon() {
          return `images/${this.iconName}`;
        },
        statCounter() {
            return this.dbData.filter(data => {
                return data[this.filterBy] === this.filterKey;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    $this: &; // Let's cache the root selector

    display: flex;

    &__icon {
        margin-right: 12px;
    }

    &__reading,
    &__title {
        font-weight: var(--weight-bold);
    }

    &__reading {
        font-size: 1.4rem;
        margin-left: 4px;
    }

    &__title {
        align-items: center;
        background-color: var(--black);
        border-radius: 4px;
        color: var(--white);
        display: flex;
        font-size: 1rem;
        height: 16px;
        justify-content: center;
        letter-spacing: .4px;
        text: {
            align: center;
            transform: uppercase;
        }
        width: 30px;
    }

    // @todo Consider renaming and combining similar styles
    &__wrap {
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    // Modifiers
    &--icon {
        align-items: center;
        background-color: var(--alabaster);
        border-radius: 12px;
        height: 80px;
        justify-content: center;
        width: 132px;

        #{$this}__reading {
            font: {
                size: 2.4rem;
                weight: var(--weight-medium);
            }
            margin-left: 0;
        }

        #{$this}__title {
            background-color: transparent;
            color: var(--black);
            font: {
                family: 'Roboto Condensed', sans-serif;
                size: 1.2rem;
                weight: var(--weight-bold);
            }
            width: 100%;
        }
    }

    &--stack {
        display: flex;
        flex-direction: column-reverse;
        padding: 0 15px;
        text-align: center;
    }

    &--golden {
        #{$this}__title {
            background-color: var(--golden-tainoi);
        }
    }

    &--picton {
        #{$this}__title {
            background-color: var(--picton-blue);
        }
    }

    &--wild {
        #{$this}__title {
            background-color: var(--wild-watermelon);
        }
    }
}
</style>