<!-- src/views/CreateResume.vue -->
<template>
    <ResumeForm @submit="handleSubmit" />
  </template>
  
  <script setup>
  import { useResumeStore } from '../stores/resumeStore';
  import ResumeForm from '../components/ResumeForm.vue';
  
  const resumeStore = useResumeStore();
  
  const handleSubmit = (resumeData) => {
    console.log('Resume data received:', resumeData);
    resumeStore.saveResume(resumeData);
  };
  </script>
  