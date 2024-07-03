<!-- src/views/ResumePreview.vue -->
<template>
    <div>
      <h1 class="headline">Resume Preview</h1>
      <el-divider></el-divider>
      <ResumePreview />
    </div>
  </template>
  
  <script setup>
  import ResumePreview from '../components/ResumePreview.vue'


  </script>
  
  <style scoped>
  .headline{
      font-family: 'Times New Roman', Times, serif;
      font-size: 30px;
      display: flex;
      justify-content: center; 
      color: red;
    }   
   </style>
  