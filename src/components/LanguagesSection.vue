<template>
    <div class="languages-section">
      <h2>Languages</h2>
      <ul>
        <li v-for="language in languages" :key="language">{{ language }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
//   const languages = ref([
//   'Hebrew | Native',
//   'English | Professional Proficiency'
// ]);
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
  .languages-section h2 {
    background-color: #00796b;
    color: white;
    padding: 5px;
    margin: 0 -20px;
    text-align: center;
  }
  </style>
  