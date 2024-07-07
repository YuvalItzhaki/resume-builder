import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/user', { withCredentials: true });
        this.user = response.data.user;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('User is not authenticated'); // Log as an info, not an error
          this.user = null;
        } else {
          console.error('Fetching user failed:', error);
        }
      }
    },
    async logout() {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/logout', { withCredentials: true });
        this.user = null;
        console.log(response.data.message); // Log the successful logout message
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    
  },
});
