<!-- src/components/Register.vue -->
<template>
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
  