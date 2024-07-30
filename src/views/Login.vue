<template>
  <div class="page-container">
    <el-card class="form-container">
      <div slot="header">
        <span class="headline">Login</span>
      </div>
      <el-form @submit.prevent="login">
        <el-form-item>
          <el-input v-model="email" placeholder="Email" type="email" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="Password" type="password" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </el-form>
      <div class="google-button">
        <button type="success" @click="loginWithGoogle">
          <img src="../assets/png@1x/dark/web_dark_rd_ctn@1x.png" alt="Google Sign-In">
        </button>
        <!-- <button class="login-button" @click="loginWithLinkedIn">
          <img src="../assets/Retina/Sign-In-Large---Default.png" alt="LinkedIn Sign-In">
        </button> -->
      </div>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();
const errorMessage = ref('');


const login = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/users/login', {
      email: email.value,
      password: password.value
    });

    // Fetch the current user to update the auth store
    await authStore.fetchCurrentUser();
    router.push('/create-resume');
  } catch (error) {
    if (error.response && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'Login failed';
    }
    console.error('Login failed:', error);
  }
};

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
.page-container {
  font-family: 'Times New Roman', Times, serif;
  max-width: 700px;
  margin: auto;
  padding: 20px;
}

.form-container {
  padding: 30px;
  border-radius: 10px;
}

.el-input {
  width: 100%;
}

.el-button {
  width: 100%;
}
.google-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  display: flex;
}
p {
  justify-content: center;
  align-items: center;
  display: flex;
}
.error-message {
  color: red;
}
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
