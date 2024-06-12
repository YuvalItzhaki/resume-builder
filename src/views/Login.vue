<template>
  <div>
    <button @click="loginWithGoogle">Login with Google</button>
    <ResumeTestTemplate />
  </div>
</template>

<script setup>
import ResumeTestTemplate from '../components/ResumeTestTemplate.vue';
const loginWithGoogle = () => {
  window.location.href = 'http://localhost:5001/api/auth/google';
};
</script>
