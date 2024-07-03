<!-- src/views/ResumePreview.vue -->
<template>
    <div>
      <h1 class="headline">My Resumes</h1>
      <el-divider></el-divider>
      <div><ResumeList /></div>
    </div>
  </template>
  
  <script setup>
  import ResumeList from '../components/ResumeList.vue'
  
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
  