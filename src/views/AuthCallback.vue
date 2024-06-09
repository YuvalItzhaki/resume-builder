<!-- src/views/AuthCallback.vue -->
<!-- <template>
    <div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/useAuthStore';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  onMounted(async () => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
  
    if (code) {
      try {
        const response = await axios.post('http://localhost:5000/auth/google/callback', { code });
        const token = response.data.token;
  
        // Save the token in your store
        authStore.setToken(token);
  
        // Redirect to the dashboard or another protected route
        router.push('/dashboard');
      } catch (error) {
        console.error('Authentication failed:', error);
        // Handle error, show message to user, etc.
      }
    } else {
      console.error('No authorization code found.');
      // Handle error, show message to user, etc.
    }
  });
  </script>
   -->
   <!-- src/views/AuthCallback.vue -->
<template>
    <div>
      <p>Loading...</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/useAuthStore';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  onMounted(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
  
    if (token) {
      authStore.setToken(token);
      router.push('/dashboard');
    } else {
      console.error('No token found.');
      // Handle error, show message to user, etc.
    }
  });
  </script>
  