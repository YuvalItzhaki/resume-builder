<template>
  <div class="login-container">
    <button class="login-button" @click="loginWithGoogle">
      <img src="../assets/png@2x/light/web_light_sq_SI@2x.png" alt="Google Sign-In">
    </button>
    <button class="login-button" @click="loginWithLinkedIn">
      <img src="../assets/Retina/Sign-In-Large---Default.png" alt="LinkedIn Sign-In">
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
// const loginWithLinkedIn = () => {
//   window.location.href = 'http://localhost:5001/api/auth/linkedin';
// };

const loginWithLinkedIn = () => {
  const clientId = '77idrzze8fs2qi';
  const redirectUri = encodeURIComponent('http://localhost:5001/api/auth/linkedin/callback');
  const state = 'Israel';
  const scope = 'r_liteprofile r_emailaddress';

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  window.location.href = authUrl;
};

</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column; /* Align items vertically */
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.login-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  margin-bottom: 20px; /* Add some space between buttons */
}
</style>
