<template>
  <div>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script setup>
const loginWithGoogle = () => {
  window.location.href = 'http://localhost:5001/api/auth/google';
};
</script>
