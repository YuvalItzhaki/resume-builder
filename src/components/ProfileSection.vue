<template>
    <div class="profile-section">
      <!-- <img src="path/to/profile-picture.jpg" alt="Profile Picture" class="profile-pic"/> -->
      <h1>{{ name }}</h1>
      <p>{{ title }}</p>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const name = ref();
    const title = ref();


    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        name.value = response.data.name.toUpperCase();
        title.value = response.data.title.toUpperCase();

    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
  </script>
  
  <style scoped>
  .profile-section {
    text-align: left;
    height: 200px;
    background-color: #073763;
    /* box-shadow: 0 8px 4px rgba(0, 0, 0, 0.1); */
    position: relative; /* Needed for the inner frame positioning */
    padding: 20px; /* Space between the inner frame and the content */

  }
  .profile-section::before {
  content: "";
  position: absolute;
  top: 10px; /* Adjust this value to control the inner frame position */
  left: 10px; /* Adjust this value to control the inner frame position */
  right: 10px; /* Adjust this value to control the inner frame position */
  bottom: 10px; /* Adjust this value to control the inner frame position */
  border: 1px solid white; /* Color and thickness of the inner frame */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* Inner shadow for better appearance */
  pointer-events: none; /* Ensure the inner frame doesn't interfere with interactions */
}
  
  .profile-pic {
    width: 100%;
    border-radius: 50%;
  }
  
  h1 {
    font-size: 34px;
    font-family: 'Times New Roman', Times, serif;
    color: white;
    margin: 10px 0;
  }
  
  p {
    font-size: 18px;
    color: white;
    font-family: 'Times New Roman', Times, serif;
  }
  </style>
  