
<template>
    <div>
      <h1>Legal Documents</h1>
      <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <el-tab-pane label="Terms of Service" name="first"><TermsOfService /></el-tab-pane>
    <el-tab-pane label="Privacy Policy" name="second"><PrivacyPolicy /></el-tab-pane>
    <el-tab-pane label="Cookie Policy" name="third">Cookie Policy</el-tab-pane>
  </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import TermsOfService from '../components/TermsOfService.vue';
  import PrivacyPolicy from '../components/PrivacyPolicy.vue';
  
  const router = useRouter();
  const activeName = ref('first')

  
  const navigateToCreateResume = () => {
    router.push('/create-resume');
  };
  </script>
  
  <style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}  </style>
  
