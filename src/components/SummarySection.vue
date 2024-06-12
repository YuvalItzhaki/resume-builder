<template>
    <div class="summary-section">
      <h2>Profile</h2>
      <p>{{ summery }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const summery = ref(
    'Experienced software engineer with a strong foundation in computer science fundamentals and a track record of delivering high-quality solutions, Proven ability to collaborate eectively in cross-functional teams and thrive in fast-paced environments, Skilled in problem-solving and equipped to tackle diverse challenges with creativity and resilience.'
);
  </script>
  
  <style scoped>
  .summary-section {
    margin-bottom: 20px;
  }
  </style>
  