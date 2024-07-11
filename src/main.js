import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import router from './router/index';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VueSelect from 'vue-select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useAuthStore } from './stores/authStore';
import piniaPersist from 'pinia-plugin-persist';


library.add(faEnvelope, faPhone, faLinkedin, faGithub);

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.component("v-select", VueSelect)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(vuetify);
app.use(router);
app.use(ElementPlus);
app.use(pinia);

const authStore = useAuthStore();

if (authStore.token) {
  console.log('Token exists, fetching current user...');
  authStore.fetchCurrentUser().then(() => {
    console.log('User fetched, mounting app...');
    app.mount('#app');
  }).catch((error) => {
    console.error('Error fetching user:', error);
    app.mount('#app');
  });
} else {
  console.log('No token, mounting app...');
  app.mount('#app');
}

