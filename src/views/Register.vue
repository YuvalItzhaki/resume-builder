<!-- src/components/Register.vue -->
<!-- <template>
    <v-container>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary">Register</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../services/api';
  
  const router = useRouter();
  const formData = reactive({
    email: '',
    password: ''
  });
  
  const handleSubmit = async () => {
    try {
      await api.post('/register', formData);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };
  </script>
  
  <style scoped>
  </style>
   -->
   <!-- src/views/Register.vue -->
<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        <p>Or register with Google</p>
        <button @click="registerWithGoogle">Register with Google</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/useAuthStore';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const authStore = useAuthStore();
  
  const register = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/users/register', {
        email: email.value,
        password: password.value
      });
  
      const token = response.data.token;
      authStore.setToken(token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error, show message to user, etc.
    }
  };
  
  const registerWithGoogle = () => {
    window.location.href = 'http://localhost:5001/api/auth/google';
  };
  </script>
  