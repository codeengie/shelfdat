<template>
    <dialog class="details" open>
        <figure class="details__pic">
            <img
                alt="Foobar"
                class="details__img"
                height="164"
                src="/images/placeholder.svg"
                width="412">
        </figure>
        <h2 class="details__title">Spider-Man <span class="details__year">(2019)</span></h2>
        <h3 class="details__subtitle">Into The Spider-Verse</h3>

        <h4>Location</h4>
        <p>Garage - Bin: 003</p>

        <h4>Notes</h4>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit.</p>

        <time datetime="2022-09-17T18:36:22.473Z">Sep 17, 2022</time>
    </dialog>
</template>

<script>
export default {
    name: 'Details'
}
</script>

<style lang="scss" scoped>
.details {
    background-color: var(--dialog-bg-color);
    border: 0;
    display: grid; // Lets me animate in/out animations
    margin: auto;
    padding: 0;
    position: fixed;
    inset: 0;

    &__title,
    &__year {
        font: {
            size: 1.8rem;
            weight: var(--weight-medium);
        }
    }

    &__subtitle {
        color: var(--dialog-text-color);
        font: {
            size: 1.4rem;
            weight: var(--weight-medium);
        }
    }

    &__title {
        color: var(--dialog-title-text-color);
    }

    &__year {
        color: var(--dialog-text-color);
    }
}
</style>