<!-- src/components/ResumeForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="formData.name" type="text" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="formData.email" type="email" required />
    </div>
    <div>
      <label for="title">Title:</label>
      <input id="title" v-model="formData.title" type="title" required />
    </div>
    <div>
      <label for="description">Description:</label>
      <input id="description" v-model="formData.description" type="description" required />
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
  description: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  emit('submit', formData.value);
};
</script>

<style scoped>
/* Add your styles here */
</style>
