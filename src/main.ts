import { createApp } from 'vue';
import './assets/reset.scss';
import '@coreui/coreui/dist/css/coreui.min.css';
import './assets/btn.scss';
import './assets/main.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import App from '@/App.vue';
import { createPinia } from 'pinia';

library.add(faTrashAlt, faPlus);
const app = createApp(App);
app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
