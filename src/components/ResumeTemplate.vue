<!-- ResumeTemplate.vue -->
<template>
    <div class="resume">
      <h1>{{ userDetails.name }}</h1>
      <p>Email: {{ userDetails.email }}</p>
      <p>Phone: {{ userDetails.phone }}</p>
      <p>Summary: {{ userDetails.summary }}</p>
      <!-- Add more fields as needed -->
    </div>
  </template>
  
  <script setup>
  import { useResumeStore } from '../stores/resumeStore';
  import { computed } from 'vue';
  
  const resumeStore = useResumeStore();
  const userDetails = computed(() => resumeStore.userDetails);
  </script>
  
  <style scoped>
  /* Add styles for your resume template */
  .resume {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .resume h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .resume p {
    margin: 5px 0;
  }
  </style>
  