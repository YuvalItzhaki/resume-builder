<template>
    <div class="skills-section">
      <h2>Tech Skills</h2>
      <ul>
        <li v-for="skill in tech_skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const tech_skills = ref([]);

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        tech_skills.value = response.data.tech_skills;
        console.log(tech_skills)
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
//   import { ref } from 'vue';
//   const techSkills = ref([
//   'Python',
//   'Java',
//   'Vue3.js',
//   'JavaScript',
//   'Node.js',
//   'BullMQ',
//   'MongoDB',
//   'MySQL',
//   'Dockers',
//   'Linux',
//   'AWS'
// ]);
  </script>
  
  <style scoped>
  .skills-section h2 {
    background-color: #00796b;
    color: white;
    padding: 5px;
    margin: 0 -20px;
    text-align: center;
  }
  </style>
  