<template>
    <h1>{{ titleLogo }}</h1>
    <form class="login-form" @submit.prevent="submitLoginForm">
        <nas-input-field
            field-name="Email"
            field-type="email"
            v-model="emailInput"></nas-input-field>

        <nas-input-field
            field-name="Password"
            field-type="password"
            v-model="passwordInput"></nas-input-field>

        <button class="login-form__button">Login</button>
        <p class="login-form__signup">Don&rsquo;t have an account?
            <strong>
                <router-link class="login-form__link" to="/signup">Sign Up</router-link>
            </strong>
        </p>
    </form>
</template>

<script>
// @todo IntelliJ entered this automagically but you declared it in main.js, need to decide global or local
// import InputField from "@/components/InputField";

export default {
    name: 'Login',
    // components: {InputField},
    data() {
        return {
            emailInput: null,
            passwordInput: null,
            titleLogo: process.env.VUE_APP_TITLE
        }
    },
    methods: {
        submitLoginForm() {
            console.log(`Submitting login form: ${this.emailInput}, ${this.passwordInput}`);
        }
    }
}
</script>

<style lang="scss" scoped>
h1 {
    font: {
        size: 2.4rem;
        weight: var(--weight-bold);
    }
    margin: 40px 0;
    text-align: center;
}

.login-form {
    $this: &; // Let's cache the root selector @todo remove if not used
    margin: 0 auto;
    width: 290px;

    &__button {
        align-items: center;
        background-color: var(--form-btn-bg-color);
        border-radius: 4px;
        color: var(--form-btn-text-color);
        display: flex;
        font: {
            size: 1.6rem;
            weight: var(--weight-medium);
        };
        height: 40px;
        justify-content: center;
        margin-top: 20px;
        overflow: hidden;
        position: relative;
        width: 290px;

        &:active {
            &:after {
                height: 0;
                opacity: 1;
                transition: 0s;
                width: 0;
            }
        }

        &:after {
            background-color: lighten(#00b9ff, 25%); // @todo need to figure out why I cant use css variables
            border-radius: 50%;
            content: '';
            height: 310px;
            opacity: 0;
            position: absolute;
            transition: all .6s;
            width: 310px;
        }

        &:hover {
            background-color: darken(#00b9ff, 5%);
        }
    }

    &__signup {
        font-size: 1rem;
        margin-top: 12px;
        text-align: center;
    }
}
</style>