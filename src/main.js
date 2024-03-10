import { createApp } from 'vue';

import App from '@/App.vue';
// import store from '@/store';
import { createPinia } from 'pinia';

const app = createApp(App);
// app.use(store);
app.use(createPinia());
app.mount('#app');
