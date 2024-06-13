<template>
  <div class="contact-section">
    <h2>CONTACT</h2>
    <p>
      <label for="contact-email">
        <font-awesome-icon icon="envelope" /> <a :href="'mailto:' + contact.email">{{ contact.email }}</a>
      </label>
    </p>
    <p>
      <label for="contact-phone">
        <font-awesome-icon icon="phone" /> {{ contact.phone }}
      </label>
    </p>
    <p>
      <label for="contact-linkedin">
        <font-awesome-icon :icon="['fab', 'linkedin']" /> <a :href="contact.linkedin" target="_blank"> LinkedIn</a>
      </label>
    </p>
    <p>
      <label for="contact-github">
        <font-awesome-icon :icon="['fab', 'github']" /> <a :href="contact.github" target="_blank"> GitHub</a>
      </label>
    </p>
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
  padding: 2px;
  background-color: #f9f9f9;
  border-radius: 2px;
  font-family: 'Times New Roman', Times, serif;
  /* box-shadow: 0 8px 4px rgba(0, 0, 0, 0.1); */
}

.contact-section h2 {
  color: #073763;
  padding: 4px;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.contact-section p {
  margin: 5px 0;
}

.contact-section a {
  color: #00796b;
  text-decoration: none;
}

.contact-section a:hover {
  text-decoration: underline;
}
</style>
