import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/login', credentials);
        this.user = response.data;
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async register(credentials) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', credentials);
        this.user = response.data;
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/user');
        this.user = response.data;
      } catch (error) {
        console.error('Fetching user failed:', error);
        this.user = null;
      }
    },
    logout() {
      this.user = null;
      axios.post('http://localhost:5001/api/auth/logout');
    },
  },
});