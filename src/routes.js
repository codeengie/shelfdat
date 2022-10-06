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
                description: 'Log in to your ShelfDat account, the only app you\'ll ever need to manage your collections',
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
                description: 'The dashboard peers into your collections and gives you stats at a glance',
                header: true,
                navbar: true,
                requiresAuth: true
            }
        },
        {
            path: '/:notFound(.*)',
            name: '404',
            component: NotFound,
            meta: {
                title: '404',
                description: '(404) We could\'t find the page you\'re looking for',
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
                description: 'View your entire collection with options to read details, search and filter',
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
                description: 'Add an item to any of your collections',
                header: true,
                navbar: true,
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description);

    if (!store.state.isAuthenticated) {
        await store.dispatch('reAuth');
    }

    /**
     *  At the moment, if you hit the 'Login' page directly it fires `reAuth()` but doesn't redirect because it doesn't
     *  know where you are going. But if you hit 'Dashboard', 'Inventory', 'Create' it redirects as expected.
     * @todo Create another condition to redirect from 'Login'
     */
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!store.state.isAuthenticated) {
            next({ name: 'Login' });
        } else {
            next();
        }
    } else {
        next();
    }

    /*if (to.name !== 'Login' && !store.state.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }*/
});

export default router;