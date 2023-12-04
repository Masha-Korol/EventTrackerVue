import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/header';

require('@/../global-styles.css');

const EventList = require('@/components/EventList.vue');
const EventInfo = require('@/components/EventInfo.vue');

// const routes = [
//     // { path: '/', component: Home },
//     { path: '/events', component: EventList },
//     { path: '/events/id', component: EventInfo },
// ];
//
// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHashHistory(),
//     routes,
// })

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.mount('#app');
