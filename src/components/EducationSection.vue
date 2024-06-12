<template>
    <div class="education-section">
      <h2>Education</h2>
      <ul>
        <li v-for="edu in education" :key="edu.degree">{{ edu.institution }} - {{ edu.degree }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const education = ref([]);

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        education.value = response.data.education;
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
//   import { ref } from 'vue';
//   const education = ref([
//   { institution: 'Bar-Ilan University', degree: 'B.Sc. in Mathematics and Computer Science' },
//   { institution: 'The College of Management Academic Studies', degree: 'LLB in Law' }
// ]);


  </script>
  
  <style scoped>
  .education-section h2 {
    background-color: #00796b;
    color: white;
    padding: 5px;
    margin: 0 -20px;
    text-align: center;
  }
  </style>
  