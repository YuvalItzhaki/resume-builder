<template>
  <div class="resume">
    <aside class="sidebar">
      <section
        v-draggable="[
          sidebarComponents,
          {
            animation: 150,
            ghostClass: 'ghost',
            group: 'components',
            onUpdate,
            onAdd,
            onRemove
          }
        ]"
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
      >
        <div
          v-for="item in sidebarComponents"
          :key="item.id"
          class="draggable-component"
        >
          <span class="handle"></span>
          <component :is="item.component" />
        </div>
      </section>
    </aside>
    <main class="main-content">
      <section
        v-draggable="[
          mainComponents,
          {
            animation: 150,
            ghostClass: 'ghost',
            group: 'components',
            onUpdate,
            onAdd,
            onRemove
          }
        ]"
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
      >
        <div
          v-for="item in mainComponents"
          :key="item.id"
          class="draggable-component"
        >
          <span class="handle"></span>
          <component :is="item.component" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { vDraggable } from 'vue-draggable-plus';

import ProfileSection from './ProfileSection.vue';
import ContactSection from './ContactSection.vue';
import SkillsSection from './SkillsSection.vue';
import SummarySection from './SummarySection.vue';
import ExperienceSection from './ExperienceSection.vue';
import LanguagesSection from './LanguagesSection.vue';
import EducationSection from './EducationSection.vue';

const sidebarComponents = ref([
  { name: 'Profile', component: ProfileSection, id: 'profile' },
  { name: 'Contact', component: ContactSection, id: 'contact' },
  { name: 'Skills', component: SkillsSection, id: 'skills' },
  { name: 'Languages', component: LanguagesSection, id: 'languages' },
  { name: 'Education', component: EducationSection, id: 'education' },
]);

const mainComponents = ref([
  { name: 'Summary', component: SummarySection, id: 'summary' },
  { name: 'Experience', component: ExperienceSection, id: 'experience' },
]);

function onUpdate() {
  console.log('update');
}

function onAdd() {
  console.log('add');
}

function onRemove() {
  console.log('remove');
}
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
  /* background-color: #e0f7fa; */
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  width: 70%;
  padding: 20px;
  background-color: white;
}

.draggable-component {
  margin-bottom: 10px;
  /* border: 1px solid #ccc; */
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: move;
}

.handle {
  display: block;
  margin-bottom: 5px;
  cursor: move;
  color: #00796b;
  font-weight: bold;
}
</style>
