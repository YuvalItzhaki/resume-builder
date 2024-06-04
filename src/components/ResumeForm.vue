<!-- src/components/ResumeForm.vue -->
<script setup>
  import { reactive } from 'vue';
  import { useResumeStore } from '../stores/resume.js';
  
  const resumeStore = useResumeStore();
  const resumeData = reactive({
    name: '',
    email: '',
    phone: '',
    location: '',
    // Add more fields as needed
  });
  
  const handleSubmit = () => {
    resumeStore.saveResume(resumeData);
  };
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="resumeData.name"
          label="Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="resumeData.email"
          label="Email"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="resumeData.phone"
          label="Phone"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="resumeData.location"
          label="Location"
          required
        ></v-text-field>
      </v-col>
      <!-- Add more fields as needed -->
      <v-col cols="12">
        <v-btn type="submit" color="primary">Save Resume</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>
</style>
