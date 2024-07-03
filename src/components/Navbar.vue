<template>
  <div>
    <v-btn text @click="navigate('/resume-list')">Resume List</v-btn>
    <v-btn text @click="navigate('/create-resume')">Resume Form</v-btn>
    <v-btn text @click="navigate('/dashboard')">Dashboard</v-btn>
    <v-btn text @click="navigate('/login')">Login</v-btn>
    <v-btn text @click="navigate('/register')">Register</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* Your styles here */
</style>
