<template>
    <div class="wrap">
        <Brand img-height="35"/>

        <!-- @todo Add `novalidate` attribute once you implement input field validation -->
        <form class="login-form" @submit.prevent="submitForm()">
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

            <!--<a href="#" @click="toggleClass()">Spin!</a>-->

            <p class="login-form__signup">Don&rsquo;t have an account?
                <router-link class="login-form__link" to="/signup">Sign Up</router-link>
            </p>
        </form>
        <Footer/>
    </div>
</template>

<script>
// @todo Doubt I need this, remove here and from package.json
// import AmplifyVue from '@aws-amplify/ui-vue';
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
            passwordInput: null,
            spin: false
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
        submitForm() {
            if (this.emailInput && this.passwordInput) {
                this.login({email: this.emailInput, password: this.passwordInput});
            }
        },
        submitLoginForm() {
            console.log('submitLoginForm');
            /*if (this.emailInput || this.passwordInput) {
                console.log(`Submitting login form: ${this.emailInput}, ${this.passwordInput}`);
            } else {
                this.$refs.inputfield.validateField();
                console.log('Trigger forced validation...');
            }*/
        },
        toggleClass() {
            this.spin = !this.spin;
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
    display: flex;
    flex-flow: column;
    margin: 0 auto;
    width: 290px;

    &__button {
        margin-top: 26px;
    }

    &__forgot {
        font: {
            size: 1.2rem;
            weight: var(--weight-medium);
        }
        text-align: right;
    }

    &__signup {
        font-size: 1.2rem;
        margin-top: 12px;
        text-align: center;
    }
}

.footer {
    margin-top: auto;
    padding-bottom: 16px;
}

.brand {
    margin-top: 90px;
}

.wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
}
</style>