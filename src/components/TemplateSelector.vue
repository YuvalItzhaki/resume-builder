<template>
    <div>
      <h2>Select a Template</h2>
      <div v-for="template in templates" :key="template.id" @click="selectTemplate(template.id)">
        <h3>{{ template.name }}</h3>
        <p>{{ template.description }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // Ref to hold the list of templates
  const templates = ref([]);
  
  // Define emit function for emitting custom events
  const emit = defineEmits(['select-template']);
  
  // Fetch templates on component mount
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/templates');
      templates.value = response.data;
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  });
  
  // Function to handle template selection
  const selectTemplate = (templateId) => {
    emit('select-template', templateId); // Emit the selected template ID to the parent component
  };
  </script>
  
  <style scoped>
  /* Add styles for template selection display */
  </style>
  