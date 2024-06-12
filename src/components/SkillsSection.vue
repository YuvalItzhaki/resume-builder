<template>
    <div class="skills-section">
      <h2>TECH SKILLS</h2>
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
  .skills-section {
    font-family: 'Times New Roman', Times, serif;
  }
  .skills-section h2 {
    color: #073763;
    padding: 4px;
    text-align: left;
    border-radius: 2px 2px 0 0;
  }

  .skills-section ul {
    margin: 5px 0;
    padding-left: 20px;
  }

  </style>
  