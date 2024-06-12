<template>
    <div class="experience-section">
      <h2>Experience</h2>
      <div v-for="job in experience" :key="job.title" class="job">
        <h3>{{ job.title }}</h3>
        <p>{{ job.company }} | {{ job.startDate }} - {{ job.endDate }}</p>
        <ul>
          <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
//   import { ref } from 'vue';
//   const experience = ref([
//   {
//     title: 'Software Engineer',
//     company: 'Nexxen',
//     startDate: 'Mar 2021',
//     endDate: 'Mar 2024',
//     duties: [
//       'Development and maintenance end-to-end web application using Vue3.js and Node.js, From design to production.',
//       'Take part in architecture decision making for frontend and backend interface.',
//       'Transform legacy Python code for BI project with Emotional analysis of client ads into a web app dashboard.',
//       'Collaborate with cross-functional teams to deliver high-quality solutions.',
//       'Contribute to a toolchain project for the creative studio, building interactive ads using vanilla JavaScript and Node.js.'
//     ]
//   },
//   {
//     title: 'Automation Developer',
//     company: 'Nexxen',
//     startDate: 'Mar 2018',
//     endDate: 'Feb 2021',
//     duties: [
//       'Development and maintenance of a test automation framework for the toolchain projects utilizing Java, Python, Selenium, Postman, and Charles.',
//       'Create a Python tool for building ads for automation.'
//     ]
//   }
// ]);
import { ref, onMounted } from 'vue';
import axios from 'axios';

const experience = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:5001/api/resumes');
    experience.value = response.data.experience;
  } catch (error) {
    console.error('Error fetching resume data:', error);
  }
});
  </script>
  
  <style scoped>
  .experience-section {
    margin-top: 20px;
  }
  
  .job p, .job h3 {
    margin: 0;
  }
  
  .job ul {
    margin-top: 10px;
    padding-left: 20px;
  }
  
  .job li {
    margin-bottom: 10px;
  }
  </style>
  