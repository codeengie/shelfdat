import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import NewMedia from './components/NewMedia';
import Skeleton from './components/Skeleton';
import Stat from './components/Stat';
import ModWrap from './components/ModWrap';
import DoughnutChart from './components/DoughnutChart';
import Inventory from '@/components/Inventory';
import Actions from '@/components/Actions';
import InputField from '@/components/InputField';
import Sheet from '@/components/Sheet';
import Login from '@/views/Login';
import Dashboard from '@/views/Dashboard';

const router = createRouter({
    history: createWebHistory(),
   routes: [
       {
           path: '/login',
           name: 'Login',
           component: Login,
           meta: {
               title: 'Login',
               description: 'Quisque id volutpat risus.',
               header: false
           }
       },
       {
           path: '/dashboard',
           name: 'Dashboard',
           component: Dashboard,
           meta: {
               title: 'Dashboard',
               description: 'Praesent rhoncus id ligula id consequat',
               header: true
           }
       }
   ]
});

router.beforeEach((to, from, next) => {
    // console.log(to);
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
    next(); // This should only be called once, reference vue docs when you start expanding
});

const app = createApp(App);

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
app.component('nas-sheet', Sheet);

app.mount('#app');