<template>
  <div class="login-container">
    <button class="google-button" @click="loginWithGoogle">
      <img src="../assets/png@2x/dark/web_dark_rd_SI@2x.png" alt="Google Sign-In">
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const route = useRoute();
const authStore = useAuthStore();

const loginWithGoogle = () => {
  window.location.href = 'http://localhost:5001/api/auth/google';
};

// // Handle token received from backend after Google authentication
// if (route.query.token) {
//   console.log('i am in')
//   const token = route.query.token;
//   console.log('token is: ', token)
//   authStore.token = token; // Set token in Pinia store
//   localStorage.setItem('token', token); // Store token in localStorage
//   // Fetch current user data after setting token
//   authStore.fetchCurrentUser(); // Ensure this method exists in authStore
// }

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.google-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
