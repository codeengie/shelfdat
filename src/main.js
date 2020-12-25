import { createApp } from 'vue';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

const app = createApp(App);

app.component('nas-header', Header);
app.component('nas-footer', Footer);

app.mount('#app');