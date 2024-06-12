<!-- src/components/ResumeForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="formData.name" type="text" required />
    </div>
    <div>
      <label for="title">Title:</label>
      <input id="title" v-model="formData.title" type="title" required />
    </div>
    <div>
      <label for="contact">Contact:</label>
      <input id="contact" v-model="formData.contact" type="contact" required />
    </div>
    <div>
      <label for="tech_skills">Tech Skills:</label>
      <input id="tech_skills" v-model="formData.tech_skills" type="tech_skills" required />
    </div>
    <div>
      <label for="languages">Languages:</label>
      <input id="languages" v-model="formData.languages" type="languages" required />
    </div>
    <div>
      <label for="education">Education:</label>
      <input id="education" v-model="formData.education" type="education" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="formData.email" type="email" required />
    </div>
    <div>
      <label for="profile">Profile:</label>
      <input id="profile" v-model="formData.profile" type="profile" required />
    </div>
    <div>
      <label for="experience">Experience:</label>
      <input id="experience" v-model="formData.experience" type="experience" required />
    </div>
    <!-- Add other form fields as needed -->
    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['submit']);
const formData = ref({
  name: '',
  email: '',
  title: '',
  contact: '',
  tech_skills: '',
  languages: '',
  education: '',
  profile: '',
  experience: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  emit('submit', formData.value);
};
</script>

<style scoped>
/* Add your styles here */
</style>
