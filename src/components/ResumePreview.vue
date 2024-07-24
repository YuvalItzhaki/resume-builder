<template>
  <div class="resume">
    <aside class="sidebar" ref="sidebarContent">
      <section
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
        @dragover.prevent="dragOver"
        @drop="dropItem('sidebar')"
      >
        <div
          v-for="(item, index) in sidebarComponents"
          :key="item.id"
          :class="[getComponentClass(item, 'sidebar'), 'draggable-component']"
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
    <main class="main-content" ref="mainContent">
      <section
        class="flex flex-col gap-2 p-4 w-300px bg-gray-500/5 rounded overflow-auto"
        @dragover.prevent="dragOver"
        @drop="dropItem('main')"
      >
        <div
          v-for="(item, index) in mainComponents"
          :key="item.id"
          :class="[getComponentClass(item, 'main'), 'draggable-component']"
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
  <div class="button-container">
    <el-button @click="downloadPDF">Download as PDF</el-button>
    <el-button @click="downloadWord">Download as Word</el-button>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import ProfileSection from './ProfileSection.vue';
import ContactSection from './ContactSection.vue';
import SkillsSection from './SkillsSection.vue';
import SummarySection from './SummarySection.vue';
import ExperienceSection from './ExperienceSection.vue';
import LanguagesSection from './LanguagesSection.vue';
import EducationSection from './EducationSection.vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, ImageRun } from 'docx';

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

const getComponentClass = (item, location) => {
  console.log(`Component: ${item.name}, Location: ${location}`);
  if (item.name === 'Profile') {
    return '';
  }
  return location === 'main' ? 'main-font' : 'sidebar-font';
};

const downloadPDF = async () => {
  const buttons = document.querySelector('.button-container');
  buttons.classList.add('hidden'); // Hide the buttons

  const resumeElement = document.querySelector('.resume');
  const canvas = await html2canvas(resumeElement, { scale: 2 }); // Increase scale for higher quality

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  pdf.save('resume.pdf');

  buttons.classList.remove('hidden'); // Show the buttons again
};

const downloadWord = async () => {
  const buttons = document.querySelector('.button-container');
  buttons.classList.add('hidden'); // Hide the buttons

  const resumeElement = document.querySelector('.resume');
  const canvas = await html2canvas(resumeElement, { scale: 2 }); // Increase scale for higher quality
  const imgData = canvas.toDataURL('image/png');

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          children: [new ImageRun({
            data: imgData,
            transformation: {
              width: canvas.width,
              height: canvas.height
            }
          })]
        })
      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'resume.docx';
  link.click();

  buttons.classList.remove('hidden'); // Show the buttons again
};
</script>


<style scoped>
.resume {
  display: flex;
  max-width: 544px;
  max-height: 766px;
  margin: 0 auto;
  /* border: 1px solid #e0e0e0; */
}

.sidebar {
  width: 33%;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  width: 66%;
  padding: 10px;
  /* background-color: white; */
}

.draggable-component {
  /* margin-bottom: 10px; */
  /* padding: 10px; */
  border-radius: 5px;
  /* background-color: #f9f9f9; */
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

.sidebar-font, .sidebar-font * {
  font-size: 10px; /* Font size for components in sidebar */
}

.main-font, .main-font * {
  font-size: 11px; /* Font size for components in main content */
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.hidden {
  display: none !important;
}
</style>


