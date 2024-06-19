<template>
    <div class="summary-section">
      <h2>SUMMARY</h2>
      <p>{{ summary }}</p>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const summary = ref();

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        summary.value = response.data.summary;
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
  </script>
  
  <style scoped>
  .summary-section {
    margin-bottom: 20px;
    font-family: 'Times New Roman', Times, serif;
  }
  </style>
  