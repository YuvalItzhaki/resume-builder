<!-- src/views/Dashboard.vue -->
<!-- <script setup>
import ResumeForm from '../components/ResumeForm.vue';
import ResumePreview from '../components/ResumePreview.vue';
</script>

<template>
    <v-container>
      <v-row>
        <v-col>
            <ResumeForm />
            <ResumePreview />
        </v-col>
      </v-row>
    </v-container>
  </template>
  

  
  <style scoped>
  </style>
   -->
   <template>
    <div>
      <h1>Dashboard</h1>
      <button @click="navigateToCreateResume">Create New Resume</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const navigateToCreateResume = () => {
    router.push('/create-resume');
  };
  </script>
  
  <style scoped>
  /* Add any styles you need */
  </style>
  
