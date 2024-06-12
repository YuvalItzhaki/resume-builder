<template>
    <div class="resume">
      <aside class="sidebar">
        <ProfileSection />
        <ContactSection />
        <SkillsSection />
        <LanguagesSection />
        <EducationSection />
      </aside>
      <main class="main-content">
        <SummarySection />
        <ExperienceSection />
      </main>
    </div>
  </template>
  
  <script setup>
  import ProfileSection from './ProfileSection.vue'
  import ContactSection from './ContactSection.vue'
  import SkillsSection from './SkillsSection.vue'
  import SummarySection from './SummarySection.vue'
  import ExperienceSection from './ExperienceSection.vue'
  import LanguagesSection from './LanguagesSection.vue'
  import EducationSection from './EducationSection.vue'

  </script>
  
  <style scoped>
  .resume {
    display: flex;
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid #e0e0e0;
  }
  
  .sidebar {
    width: 30%;
    background-color: #e0f7fa;
    padding: 20px;
  }
  
  .main-content {
    width: 70%;
    padding: 20px;
  }
  </style>
  