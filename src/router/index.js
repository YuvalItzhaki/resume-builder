import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CreateResume from '../views/CreateResume.vue';
import ResumePreview from '../views/ResumePreview.vue';
import MyResume from '../views/MyResume.vue';
import EditResume from '../views/EditResume.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
  },
  {
    path: '/resume-preview/:id',
    name: 'ResumePreview',
    component: ResumePreview,
    meta: { requiresAuth: true }
  },
  {
    path: '/resume-list',
    name: 'MyResume',
    component: MyResume,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-resume/:id',
    name: 'EditResume',
    component: EditResume,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const response = await fetch('http://localhost:5001/api/auth/user', {
        credentials: 'include' // This ensures cookies are included in requests
      });

      if (response.status === 401) {
        next({ name: 'Login' });
      } else {
        next();
      }
    } catch (error) {
      console.error('Error during authentication check:', error);
      next({ name: 'Login' });
    }
  } else {
    next();
  }
});

export default router;
