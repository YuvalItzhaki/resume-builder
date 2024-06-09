// src/stores/user.js
// import { defineStore } from 'pinia';
// import api from '@/services/api';

// export const useUserStore = defineStore('user', {
//   state: () => ({
//     user: null,
//     token: null,
//   }),
//   actions: {
//     async login(credentials) {
//       const response = await api.post('/login', credentials);
//       this.user = response.data.user;
//       this.token = response.data.token;
//     },
//     async register(userData) {
//       const response = await api.post('/register', userData);
//       this.user = response.data.user;
//       this.token = response.data.token;
//     },
//     logout() {
//       this.user = null;
//       this.token = null;
//     },
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.user,
//     getUser: (state) => state.user,
//   },
// });
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(email, password) {
      try {
        console.log('email:', email)
        console.log('password:', password)
        const response = await axios.post('http://localhost:5001/api/users/login', { email, password });
        this.user = response.data;
        this.token = response.data.token;
      } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
      }
    },
    async register(email, password) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', { email, password });
        this.user = response.data;
        this.token = response.data.token;
      } catch (error) {
        console.error('Error registering:', error.response ? error.response.data : error.message);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
    },
  },
});

