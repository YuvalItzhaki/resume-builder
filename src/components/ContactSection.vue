<template>
  <div class="contact-section">
    <h2>Contact</h2>
    <p><strong>Email:</strong> <a :href="'mailto:' + contact.email">{{ contact.email }}</a></p>
    <p><strong>Phone:</strong> {{ contact.phone }}</p>
    <p><strong>LinkedIn:</strong> <a :href="contact.linkedin">{{ contact.linkedin }}</a></p>
    <p><strong>GitHub:</strong> <a :href="contact.github">{{ contact.github }}</a></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const contact = ref({
  email: '',
  phone: '',
  linkedin: '',
  github: ''
});

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        contact.value = response.data.contact;
        console.log(contact.value)
    } catch (error) {
        console.error('Error fetching resume data:', error);
    }
    });
</script>

<style scoped>
.contact-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-section h2 {
  background-color: #00796b;
  color: white;
  padding: 10px;
  text-align: center;
  border-radius: 5px 5px 0 0;
}

.contact-section p {
  margin: 10px 0;
}

.contact-section a {
  color: #00796b;
  text-decoration: none;
}

.contact-section a:hover {
  text-decoration: underline;
}
</style>
