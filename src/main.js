import { createApp } from 'vue';
// import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import router from './routes';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import NewMedia from './components/NewMedia';
import Skeleton from './components/Skeleton';
import Stat from './components/Stat';
import ModWrap from './components/ModWrap';
import DoughnutChart from './components/DoughnutChart';
import Inventory from './components/Inventory';
import Actions from './components/Actions';
import InputField from './components/InputField';
import InputFile from './components/InputFile';
import InputRadio from './components/InputRadio';
import Sheet from './components/Sheet';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('nas-header', Header);
app.component('nas-footer', Footer);
app.component('nas-newmedia', NewMedia);
app.component('nas-skeleton', Skeleton);
app.component('nas-stat', Stat);
app.component('nas-modwrap', ModWrap);
app.component('nas-doughnut-chart', DoughnutChart);
app.component('nas-inventory', Inventory);
app.component('nas-actions', Actions);
app.component('nas-input-field', InputField);
app.component('nas-input-file', InputFile);
app.component('nas-input-radio', InputRadio);
app.component('nas-sheet', Sheet);

app.mount('#app');