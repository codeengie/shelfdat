import { createApp } from 'vue';
// import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import router from './routes';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import ModWrap from './components/ModWrap';
import NavBar from './components/NavBar';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('nas-header', Header);
app.component('nas-footer', Footer);
app.component('nas-modwrap', ModWrap);
app.component('NavBar', NavBar);

app.mount('#app');