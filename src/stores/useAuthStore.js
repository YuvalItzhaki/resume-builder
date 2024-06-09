import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/login', credentials);
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});



