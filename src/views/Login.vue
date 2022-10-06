<template>
    <div class="content">
        <Brand img-height="44" img-width="205"/>

        <!-- @todo Add `novalidate` attribute once you implement input field validation -->
        <form class="login-form" @submit.prevent="submitLogin()">
            <InputField
                field-name="Email"
                field-type="email"
                v-model="emailInput"/>

            <InputField
                field-name="Password"
                field-type="password"
                v-model="passwordInput"/>

            <router-link class="login-form__forgot" to="/forgot-password">Forgot Password?</router-link>

            <!-- Do not add `type="button"`, Vue no like, disable @submit -->
            <Button
                button-text="Login"
                :is-disabled="toggleForm"
                :class="{ 'button--spinner': loadStatus }"
                class-name="login-form__button"/>

            <p class="login-form__signup">Don&rsquo;t have an account?
                <router-link class="login-form__link" to="/signup">Sign Up</router-link>
            </p>
        </form>
        <Footer/>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Brand from '../components/Brand';
import Button from '../components/Button';
import Footer from '../components/Footer';
import InputField from '../components/InputField';

export default {
    name: 'Login',
    components: {
        Brand,
        Button,
        Footer,
        InputField
    },
    data() {
        return {
            emailInput: null,
            passwordInput: null
        }
    },
    computed: {
        ...mapGetters(['loadStatus']),
        toggleForm() {
            return !(this.emailInput && this.passwordInput);
        }
    },
    methods: {
        ...mapActions(['login']),
        submitLogin() {
            if (this.emailInput && this.passwordInput) {
                this.login({ email: this.emailInput, password: this.passwordInput });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.brand {
    margin-top: 90px;
    text-align: center;
}

.content {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
}

.footer {
    margin-top: auto;
    padding-bottom: 16px;
}

.login-form {
    $this: &; // Let's cache the root selector @todo remove if not used
    display: flex;
    flex-flow: column;
    margin: 125px auto 0;
    width: 290px;

    &__button {
        margin-top: 28px;
    }

    &__forgot {
        font: {
            size: 1.2rem;
            weight: var(--weight-medium);
        }
        margin-top: 8px;
        text-align: right;
    }

    &__link {
        &:hover {
            text-decoration: underline;
        }
    }

    &__signup {
        font-size: 1.2rem;
        margin-top: 65px;
        text-align: center;
    }
}
</style>