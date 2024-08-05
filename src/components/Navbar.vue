<template>
  <div>
    <v-btn v-if="authStore.isAuthenticated" text @click="navigate('/resume-list')">Resume List</v-btn>
    <v-btn v-if="authStore.isAuthenticated" text @click="navigate('/create-resume')">Resume Form</v-btn>
    <v-btn text @click="navigate('/legal-documents')">Legal Documents</v-btn>
    <v-btn v-if="!authStore.isAuthenticated" text @click="navigate('/register')">Register</v-btn>
    <v-btn v-if="!authStore.isAuthenticated" text @click="navigate('/login')">Sign in</v-btn>
    <v-btn v-if="authStore.isAuthenticated" text @click="handleLogout">Logout</v-btn>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { watch } from 'vue';

const router = useRouter();
const authStore = useAuthStore();

const navigate = (path) => {
  router.push(path);
};

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

// Watch for changes in the authentication state
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (!isAuthenticated) {
    router.push('/login');
  }
});
</script>

<style scoped>
/* Your styles here */
</style>
