import {createRouter, createWebHistory} from 'vue-router';

import EventList from '@/components/EventList.vue';
import Recommendations from '@/components/Recommendations.vue';
import Administration from '@/components/Administration.vue';
import Chat from '@/components/Chat.vue';
import EventInfo from '@/components/EventInfo.vue';
import Profile from '@/components/Profile.vue';
import UserProfile from '@/components/UserProfile.vue';
import Login from '@/components/Login.vue';

const publicPages = ['/login'];
const adminOnlyPages = ['/administration'];

const routes = [
    { path: '/', name: 'EventList', component: EventList },
    { path: '/recommendations', name: 'Recommendations', component: Recommendations },
    { path: '/administration', name: 'Administration', component: Administration },
    { path: '/chat/:userId', name: 'Chat', component: Chat },
    { path: '/:id', name: 'EventInfo', component: EventInfo },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/user-profile/:id', name: 'UserProfile', component: UserProfile },
    { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

router.beforeEach(authenticationCheck);

function authenticationCheck(to, from, next) {
    // redirect to login page if not logged in and trying to access a restricted page
    const authRequired = !publicPages.includes(to.path);
    const pageForAdminOnly = adminOnlyPages.includes(to.path);

    const loggedInUser = localStorage.getItem('user');

    if (authRequired && !loggedInUser) {
        return next({
            path: '/login',
            query: {returnUrl: to.path}
        });
    }

    if (pageForAdminOnly && loggedInUser && !loggedInUser.isAdmin) {
        return next({
            path: '/'
        });
    }

    next();
}

export default router;
