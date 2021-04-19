<template>
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="validateLoginForm">
        <nas-input-field
            field-name="Email"
            field-type="email"></nas-input-field>

        <nas-input-field
            field-name="Password"
            field-type="password"></nas-input-field>

        <button class="login-form__button">Login</button>
        <p>Don&rsquo;t have an account? Sign Up</p>
    </form>
</template>

<script>
// @todo IntelliJ entered this automagically but you declared it in main.js, need to decide global or local
// import InputField from "@/components/InputField";

export default {
    name: "Login",
    // components: {InputField},
    methods: {
        validateLoginForm() {
            console.log('Validating login form.');
        }
    }
}
</script>

<style lang="scss" scoped>
.login-form {
    $this: &; // Let's cache the root selector @todo remove if not used

    &__button {
        background-color: var(--form-btn-bg-color);
        color: var(--form-btn-text-color);
        font: {
            size: 1.6rem;
            weight: var(--weight-medium);
        };
        height: 40px;
        width: 290px;
    }
}
</style>