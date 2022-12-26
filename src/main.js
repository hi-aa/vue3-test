import '@/assets/css/base.css';
import 'v-calendar/dist/style.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';
import VCalendar from 'v-calendar';

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(VCalendar, {});
app.mount('#app');
