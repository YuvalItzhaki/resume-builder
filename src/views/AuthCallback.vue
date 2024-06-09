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
  