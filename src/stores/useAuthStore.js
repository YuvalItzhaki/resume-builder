// src/stores/useAuthStore.js
// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';

// export const useAuthStore = defineStore('auth', () => {
//   const token = ref(null);

//   const setToken = (newToken) => {
//     token.value = newToken;
//     localStorage.setItem('token', newToken);
//   };

//   const clearToken = () => {
//     token.value = null;
//     localStorage.removeItem('token');
//   };

//   const isAuthenticated = computed(() => !!token.value);

//   return { token, setToken, clearToken, isAuthenticated };
// });
// src/stores/useAuthStore.js
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



