// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import router from './router/index';
import ElementPlus from 'element-plus';

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);
app.use(router);
app.use(ElementPlus);

app.mount('#app');


