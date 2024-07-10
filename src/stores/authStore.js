import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      token: '',
      user: {},
      isAuthenticated: false,
    },
  }),
  getters: {
    isAuthenticated: (state) => !!state.user.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost:5001/api/auth/login', credentials);
        this.user.token = response.data.token;
        this.user.user = response.data.user;
        console.log('response.data:', response.data);
        console.log('Token after login:', this.user.token); // Check the token
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async register(credentials) {
      try {
        const response = await axios.post('http://localhost:5001/api/users/register', credentials);
        this.user.token = response.data.token;
        this.user.user = response.data.user;
      } catch (error) {
        console.error('Registration failed:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/user', {
          headers: {
            Authorization: `Bearer ${this.user.token}`
          }
        });
        this.user.user = response.data.user;
      } catch (error) {
        console.error('Fetching user failed:', error);
        this.user.user = null;
      }
    },
    logout() {
      this.user = { token: '', user: {} };
      axios.post('http://localhost:5001/api/auth/logout');
    },
  },
});
