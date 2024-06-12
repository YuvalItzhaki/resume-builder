<template>
    <div class="profile-section">
      <!-- <img src="path/to/profile-picture.jpg" alt="Profile Picture" class="profile-pic"/> -->
      <h1>{{ name }}</h1>
      <p>{{ profession }}</p>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const name = ref([]);

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        name.value = response.data.name;
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
//   import { ref } from 'vue';

//     const name = ref('YUVAL ITZHAKI');
//     const profession = ref('SOFTWARE ENGINEER');
  </script>
  
  <style scoped>
  .profile-section {
    text-align: center;
  }
  
  .profile-pic {
    width: 100%;
    border-radius: 50%;
  }
  
  h1 {
    font-size: 24px;
    margin: 10px 0;
  }
  
  p {
    color: #666;
  }
  </style>
  