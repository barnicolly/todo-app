import { createApp } from 'vue';
import './assets/reset.scss';
import './assets/btn.scss';
import './assets/main.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import App from '@/App.vue';
import { createPinia } from 'pinia';

library.add(faTrashAlt);
const app = createApp(App);
app.use(createPinia());
app.mount('#app');
app.component('font-awesome-icon', FontAwesomeIcon);
