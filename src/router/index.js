// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CreateResume from '../views/CreateResume.vue';
import ResumePreview from '../views/ResumePreview.vue';
import MyResume from '../views/MyResume.vue';
import EditResume from '../views/EditResume.vue'




const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/create-resume',
    name: 'CreateResume',
    component: CreateResume,
  },
  {
    path: '/resume-preview/:id',
    name: 'ResumePreview',
    component: ResumePreview,
    // props: route => ({ data: route.query.data ? JSON.parse(route.query.data) : null })
  },
  {
    path: '/resume-list',
    name: 'MyResume',
    component: MyResume,
  },
  {
    path: '/edit-resume/:id',
    name: 'EditResume',
    component: EditResume,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
