<template>
  <div class="skills-section">
    <h2>TECH SKILLS</h2>
    <ul>
      <li v-for="skill in techSkills" :key="skill">{{ skill }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useSkillStore } from '../stores/skillStore';

const skillStore = useSkillStore();

onMounted(() => {
  skillStore.fetchTechSkills();
});

const techSkills = computed(() => skillStore.techSkills);
</script>

<style scoped>
.skills-section {
  font-family: 'Times New Roman', Times, serif;
}

.skills-section h2 {
  color: #073763;
  padding: 4px;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.skills-section ul {
  margin: 5px 0;
  padding-left: 20px;
}

.skills-section li {
  list-style-type: disc; /* Ensure list items use bullets */
  margin-bottom: 5px; /* Space between each list item */
}
</style>
