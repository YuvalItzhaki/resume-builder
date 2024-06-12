<template>
  <div class="education-section">
    <h2>EDUCATION</h2>
    <ul>
      <li v-for="edu in education" :key="edu.degree" class="education-item">
        <div class="institution-degree">
          <strong>{{ edu.institution }}</strong> - {{ edu.degree }}
        </div>
        <div class="dates">
          <span>{{ edu.startDate }}</span> - <span>{{ edu.endDate }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const education = ref({
      institution: '',
      degree: '',
      startDate: '',
      endDate: ''
    });

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
    .education-section {
    font-family: 'Times New Roman', Times, serif;
  }
  .education-section h2 {
    color: #073763;
    padding: 4px;
    text-align: left;
    border-radius: 2px 2px 0 0;
  }
  .education-section ul {
    margin: 5px 0;
    padding-left: 20px;
  }
  </style>
  