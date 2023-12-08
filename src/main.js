import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components/header';
import router from '@/router';

require('@/../global-styles.css');

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.use(router).mount('#app');
