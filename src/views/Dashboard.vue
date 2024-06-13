
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
  
