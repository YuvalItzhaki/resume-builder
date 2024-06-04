<!-- src/views/Dashboard.vue -->
<script setup>
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
  