<template>
    <div class="languages-section">
      <h2>LANGUAGES</h2>
      <ul>
        <li v-for="language in languages" :key="language"><strong>{{ language.value }}</strong> | {{ language.level }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const languages = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/resumes');
    languages.value = response.data.languages;
  } catch (error) {
    console.error('Error fetching resume data:', error);
  }
});
  </script>
  
  <style scoped>
    .languages-section {
    font-family: 'Times New Roman', Times, serif;
  }
  .languages-section h2 {
    color: #073763;
    padding: 4px;
    text-align: left;
    border-radius: 2px 2px 0 0;
    font-family: 'Times New Roman', Times, serif;
  }
  .languages-section ul {
    margin: 5px 0;
    padding-left: 20px;
  }
  </style>
  