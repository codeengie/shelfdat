import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login';
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import Inventory from './views/Inventory';
import Create from './views/Create';
import store from './store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                title: 'Login',
                description: 'Quisque id volutpat risus.',
                header: false,
                navbar: false,
                requiresAuth: false
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                title: 'Dashboard',
                description: 'Praesent rhoncus id ligula id consequat',
                header: true,
                navbar: true,
                requiresAuth: true
            }
        },
        {
            // path: '/:pathMatch(.*)*',
            path: '/:notFound(.*)',
            name: '404',
            component: NotFound,
            meta: {
                title: '404',
                description: '404 Error Page',
                header: false,
                navbar: false,
                requiresAuth: false
            }
        },
        {
            path: '/inventory',
            name: 'Inventory',
            component: Inventory,
            meta: {
                title: 'Inventory',
                description: 'In id eros et est dignissim suscipit',
                header: true,
                navbar: true,
                requiresAuth: true
            }
        },
        {
            // @todo Remove page and route once you integrate the redesigned inventory form
            path: '/create',
            name: 'Create',
            component: Create,
            meta: {
                title: 'Create',
                description: 'Aenean finibus, massa in lacinia viverra',
                header: true,
                navbar: true,
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
    //next(); // This should only be called once, reference vue docs when you start expanding

    if (to.name !== 'Login' && !store.state.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;