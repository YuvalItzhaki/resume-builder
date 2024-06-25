<template>
    <EditResumeForm @submit="handleSubmit" />
  </template>
  
  <script setup>
//   import { useResumeStore } from '../stores/resumeStore';
  import EditResumeForm from '../components/EditResumeForm .vue';
  
//   const resumeStore = useResumeStore();
  
  const handleSubmit = (resumeData) => {
    console.log('Resume data received:', resumeData);
    // resumeStore.saveResume(resumeData);
  };
  </script>
  