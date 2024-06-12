<template>
    <div class="contact-section">
      <h2>Contact</h2>
      <p><strong>Email:</strong> <a :href="'mailto:' + contact.email">{{ contact.email }}</a></p>
      <p><strong>Phone:</strong> {{ contact }}</p>
      <p><a :href="contact.linkedin">LinkedIn</a></p>
      <p><a :href="contact.github">GitHub</a></p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
    import axios from 'axios';

    const contact = ref([]);

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        contact.value = response.data.contact;
        console.log(contact.value)
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
//   import { ref } from 'vue';
//   const contact = ref({
//   email: 'yuvalitzhaki5@gmail.com',
//   phone: '052-3825331',
//   linkedin: 'https://www.linkedin.com/in/yuval-itzhaki1/',
//   github: 'https://github.com/YuvalItzhaki'
// });
  </script>
  
  <style scoped>
  .contact-section h2 {
    background-color: #00796b;
    color: white;
    padding: 5px;
    margin: 0 -20px;
    text-align: center;
  }
  </style>
  