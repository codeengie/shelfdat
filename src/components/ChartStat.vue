<template>
    <div class="chart-stat" :class="setMods">
        <div class="chart-stat__number">{{ statNum }}</div>
        <div class="chart-stat__label">
            <span class="chart-stat__icon" v-if="statMods" :style="setIconColor"></span>
            <span class="chart-stat__text">{{ statLabel }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChartStat',
    props: {
        statIconColor: String,
        statLabel: String,
        statMods: [Array, String],
        statNum: {
            default: 0,
            required: true,
            type: Number
        }
    },
    computed: {
        setIconColor() {
            return `background-color:${this.statIconColor}`;
        },
        setMods() {
            let classesToSet = '';

            if (Array.isArray(this.statMods)) {
                this.statMods.forEach(element => {
                    classesToSet += `chart-stat--${element} `;
                });
            } else {
                classesToSet = this.statMods ? `chart-stat--${this.statMods}` : '';
            }

            return classesToSet;
        }
    }
}
</script>

<style lang="scss">
.chart-stat {
    flex-direction: column;

    &__label {
        font: {
            size: 1.4rem;
            weight: var(--weight-medium);
        }
        margin-top: 4px;
    }

    &__number {
        font: {
            size: 3rem;
            weight: var(--weight-bold);
        }
    }
}
</style>

<style lang="scss" scoped>
.chart-stat {
    align-items: center;
    display: flex;
    justify-content: center;

    &__icon {
        border-radius: 50%;
        display: block;
        height: 16px;
        margin-right: 8px;
        width: 16px;
    }

    &__label {
        display: flex;
    }

    &__number {
        color: var(--white);
    }
}
</style>