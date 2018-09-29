import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import login from '@/components/login';
import registration from '@/components/registration';
import scan from '@/components/scan';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registration',
            name: 'registration',
            component: registration
        },
        {
            path: '/scan',
            name: 'scan',
            component: scan,
            meta: {
                requiresAuth: true
            }
        },
    ]
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !currentUser) {
        next('login')
    } else if (!requiresAuth && currentUser) {
        next('scan');
    } else {
        next();
    }
});

export default router;
