<template>
    <div class="content">
        <div class="not-found">
            <figure class="not-found__fig">
                <img
                    alt="Command line window displaying error"
                    class="not-found__img"
                    height="218"
                    src="../assets/pages/404/error.svg"
                    width="306">
            </figure>
            <p class="not-found__text">We couldn&rsquo;t find the page you&rsquo;re looking for</p>
            <router-link to="/login" class="not-found__button">Go Back</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.content {
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    padding: 0 20px;
}

.not-found {
    align-items: center;
    display: flex;
    flex-direction: column;

    &__button {
        align-items: center;
        background-color: var(--cobalt);
        display: flex;
        font-size: 1.4rem;
        height: 40px;
        justify-content: center;
        text-decoration: none;
        margin-top: 32px;
        width: 120px;

        &:link,
        &:hover,
        &:visited {
            color: var(--white);
        }
    }

    &__fig {
        width: 306px;
    }

    &__img {
        box-shadow: rgba(0, 0, 0, .35) 0 5px 15px;
    }

    &__text {
        color: var(--white);
        font: {
            size: 2.2rem;
            weight: var(--weight-semibold);
        }
        line-height: 1.4;
        margin-top: 24px;
    }
}
</style>