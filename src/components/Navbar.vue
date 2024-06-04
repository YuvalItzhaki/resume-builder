<!-- src/components/Navbar.vue -->
<template>
    <v-app-bar app>
      <v-toolbar-title>Resume Builder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  </script>
  
  <style scoped>
  </style>
  