<template>
  <div class="page-container">
    <el-card class="form-container">
      <div slot="header">
        <span class="headline">Register</span>
      </div>
      <el-form @submit.prevent="register">
        <el-form-item>
          <el-input v-model="name" placeholder="Name" type="name" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="email" placeholder="Email" type="email" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" placeholder="Password" type="password" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">Register</el-button>
        </el-form-item>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p>Or</p>
      </el-form>
      <div class="google-button">
        <button type="success" @click="registerWithGoogle">
          <img src="../assets/png@1x/dark/web_dark_rd_ctn@1x.png" alt="Google Sign-In">
        </button>
      </div>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const register = async () => {
  try {
    const response = await axios.post('http://localhost:5001/api/users/register', {
      name: name.value,
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
      errorMessage.value = 'Registration failed';
    }
    console.error('Registration failed:', error);
  }
};

const registerWithGoogle = () => {
  window.location.href = 'http://localhost:5001/api/auth/google';
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
</style>
