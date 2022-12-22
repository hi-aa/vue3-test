import '@/assets/css/base.css';
import 'v-calendar/dist/style.css';

import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VCalendar from 'v-calendar';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(VCalendar, {});
app.mount('#app');
