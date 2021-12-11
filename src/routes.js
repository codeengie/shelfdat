import { createRouter, createWebHistory } from 'vue-router';
import Login from './views/Login';
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

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
        },
        {
            // path: '/:pathMatch(.*)*',
            path: '/:notFound(.*)',
            name: '404',
            component: NotFound,
            meta: {
                title: '404',
                description: '404 Error Page',
                header: false
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    // console.log(to);
    document.title = `${process.env.VUE_APP_TITLE} - ${to.name}`;
    next(); // This should only be called once, reference vue docs when you start expanding
});

export default router;