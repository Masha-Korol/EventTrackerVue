import {createRouter, createWebHistory} from 'vue-router';

import EventList from '@/components/EventList.vue';
import Recommendations from '@/components/Recommendations.vue';
import Administration from '@/components/Administration.vue';
import Chat from '@/components/Chat.vue';
import EventInfo from '@/components/EventInfo.vue';
import Profile from '@/components/Profile.vue';
import UserProfile from '@/components/UserProfile.vue';

const routes = [
    { path: '/', name: 'EventList', component: EventList },
    { path: '/recommendations', name: 'Recommendations', component: Recommendations },
    { path: '/administration', name: 'Administration', component: Administration },
    { path: '/chat/:id', name: 'Chat', component: Chat },
    { path: '/:id', name: 'EventInfo', component: EventInfo },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/user-profile/:id', name: 'UserProfile', component: UserProfile },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
