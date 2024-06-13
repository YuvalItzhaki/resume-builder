// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import router from './router/index';
import ElementPlus from 'element-plus';
import VueSelect from 'vue-select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPhone, faLink } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faEnvelope, faPhone, faLinkedin, faGithub);


const app = createApp(App);
app.component("v-select", VueSelect)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.use(ElementPlus);
app.mount('#app');


