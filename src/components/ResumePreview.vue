<template>
  <div class="resume">
    <aside class="sidebar">
      <section
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
        @dragover.prevent="dragOver"
        @drop="dropItem('sidebar')"
      >
        <div
          v-for="(item, index) in sidebarComponents"
          :key="item.id"
          class="draggable-component"
          :draggable="true"
          @dragstart="startDrag(item, index, 'sidebar')"
          @dragenter.prevent="dragEnter(index)"
        >
          <component :is="item.component" :data="item.data" />
        </div>
        <div v-if="sidebarComponents.length === 0" class="empty-drop-area">
          Drop here
        </div>
      </section>
    </aside>
    <main class="main-content">
      <section
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
        @dragover.prevent="dragOver"
        @drop="dropItem('main')"
      >
        <div
          v-for="(item, index) in mainComponents"
          :key="item.id"
          class="draggable-component"
          :draggable="true"
          @dragstart="startDrag(item, index, 'main')"
          @dragenter.prevent="dragEnter(index)"
        >
          <component :is="item.component" :data="item.data" />
        </div>
        <div v-if="mainComponents.length === 0" class="empty-drop-area">
          Drop here
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useResumeStore } from '../stores/resumeStore';

import axios from 'axios';

import ProfileSection from './ProfileSection.vue';
import ContactSection from './ContactSection.vue';
import SkillsSection from './SkillsSection.vue';
import SummarySection from './SummarySection.vue';
import ExperienceSection from './ExperienceSection.vue';
import LanguagesSection from './LanguagesSection.vue';
import EducationSection from './EducationSection.vue';

// const route = useRoute();
// const resumeStore = useResumeStore();

// const fetchResumeData = async (id) => {
//   await resumeStore.fetchResumeById(id);
// };

// onMounted(() => {
//   fetchResumeData(route.params.id);
// });

// watch(
//   () => route.params.id,
//   (newId) => {
//     fetchResumeData(newId);
//   }
// );

const sidebarComponents = ref([
  { name: 'Profile', component: ProfileSection, id: 'profile', data: {} },
  { name: 'Contact', component: ContactSection, id: 'contact', data: {} },
  { name: 'Skills', component: SkillsSection, id: 'skills', data: {} },
  { name: 'Languages', component: LanguagesSection, id: 'languages', data: {} },
  { name: 'Education', component: EducationSection, id: 'education', data: {} },
]);

const mainComponents = ref([
  { name: 'Summary', component: SummarySection, id: 'summary', data: {} },
  { name: 'Experience', component: ExperienceSection, id: 'experience', data: {} },
]);

const draggingComponent = ref(null);
const draggingSource = ref(null);
const draggingIndex = ref(null);
const targetIndex = ref(null);

function startDrag(item, index, source) {
  draggingComponent.value = item;
  draggingSource.value = source;
  draggingIndex.value = index;
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(index) {
  targetIndex.value = index;
}

function dropItem(target) {
  const sourceList = draggingSource.value === 'sidebar' ? sidebarComponents.value : mainComponents.value;
  const targetList = target === 'sidebar' ? sidebarComponents.value : mainComponents.value;

  if (draggingSource.value === target) {
    sourceList.splice(draggingIndex.value, 1);
    targetList.splice(targetIndex.value !== null ? targetIndex.value : targetList.length, 0, draggingComponent.value);
  } else {
    sourceList.splice(draggingIndex.value, 1);
    targetList.splice(targetIndex.value !== null ? targetIndex.value : targetList.length, 0, draggingComponent.value);
  }

  draggingComponent.value = null;
  draggingSource.value = null;
  draggingIndex.value = null;
  targetIndex.value = null;
}

// onMounted(async () => {
//   const id = route.params.id;
//   try {
//     const response = await axios.get(`http://localhost:5001/api/resumes/${id}`);
//     resume.value = response.data[0];

//     // Detailed logging
//     // console.log('Fetched resume data:', resumeData);

//     // // Update the sidebar and main components with the fetched data
//     // sidebarComponents.value.find(item => item.id === 'profile').data = resumeData.profile || {};
//     // sidebarComponents.value.find(item => item.id === 'contact').data = resumeData.contact || {};
//     // sidebarComponents.value.find(item => item.id === 'skills').data = resumeData.tech_skills || {};
//     // sidebarComponents.value.find(item => item.id === 'languages').data = resumeData.languages || {};
//     // sidebarComponents.value.find(item => item.id === 'education').data = resumeData.education || {};
//     // mainComponents.value.find(item => item.id === 'summary').data = resumeData.summary || {};
//     // mainComponents.value.find(item => item.id === 'experience').data = resumeData.experience || {};

//     // console.log('Fetched contact:', resumeData[0].contact);



//     // // Logging after assignment
//     // console.log('Sidebar components after data assignment:', sidebarComponents.value);
//     // console.log('Main components after data assignment:', mainComponents.value);

//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });
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
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: move;
}

.empty-drop-area {
  padding: 20px;
  text-align: center;
  color: #aaa;
  border: 2px dashed #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
