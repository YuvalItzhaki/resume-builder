<template>
  <div>
    <div class="button-container">
      <el-button @click="switchTemplate('modern')">Modern</el-button>
      <el-button @click="switchTemplate('classic')">Classic</el-button>
    </div>
    <div class="resume" :style="currentTemplate.resume">
      <header v-if="selectedTemplate === 'modern'" :style="currentTemplate.topbar">
        <h2 :style="currentTemplate.sectionTitle">{{ profileComponent.name }}</h2>
        <component :is="profileComponent.component" :data="profileComponent.data" />
      </header>
      <div class="content" :style="currentTemplate.content">
        <aside class="sidebar" ref="sidebarContent" :style="currentTemplate.sidebar">
          <section v-for="(item, index) in currentSidebarComponents" :key="item.id" :style="[currentTemplate.sectionContent, item.id === 'profile' ? currentTemplate.profileSection : {}]">
            <h2>{{ item.name }}</h2>
            <component :is="item.component" :data="item.data" />
          </section>
        </aside>
        <main ref="mainContent" :style="currentTemplate.mainContent">
          <section v-for="(item, index) in currentMainComponents" :key="item.id" :style="currentTemplate.sectionContent">
            <h2 :style="currentTemplate.sectionTitle">{{ item.name }}</h2>
            <component :is="item.component" :data="item.data" />
          </section>
        </main>
      </div>
    </div>
    <div class="button-container">
      <el-button @click="downloadPDF">Download as PDF</el-button>
      <el-button @click="downloadWord">Download as Word</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProfileSection from './ProfileSection.vue';
import ContactSection from './ContactSection.vue';
import SkillsSection from './SkillsSection.vue';
import SummarySection from './SummarySection.vue';
import ExperienceSection from './ExperienceSection.vue';
import LanguagesSection from './LanguagesSection.vue';
import EducationSection from './EducationSection.vue';
import { templates } from '../data/templates.js'; // Import templates

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, ImageRun } from 'docx';

// Get stored template or default to 'classic'
const storedTemplate = localStorage.getItem('selectedTemplate') || 'classic';
const selectedTemplate = ref(storedTemplate);
const currentTemplate = computed(() => templates[selectedTemplate.value]);

const getCurrentComponents = (template) => {
  switch (template) {
    case 'modern':
      return {
        profile: { name: '', component: ProfileSection, id: 'profile', data: {} },
        sidebar: [
          { name: 'Contact', component: ContactSection, id: 'contact', data: {} },
          { name: 'Tech Skills', component: SkillsSection, id: 'skills', data: {} },
          { name: 'Languages', component: LanguagesSection, id: 'languages', data: {} },
        ],
        main: [
          { name: 'Summary', component: SummarySection, id: 'summary', data: {} },
          { name: 'Experience', component: ExperienceSection, id: 'experience', data: {} },
          { name: 'Education', component: EducationSection, id: 'education', data: {} },
        ]
      };
    case 'classic':
      return {
        sidebar: [
          { name: '', component: ProfileSection, id: 'profile', data: {} },
          { name: 'Contact', component: ContactSection, id: 'contact', data: {} },
          { name: 'Skills', component: SkillsSection, id: 'skills', data: {} },
          { name: 'Languages', component: LanguagesSection, id: 'languages', data: {} },
          { name: 'Education', component: EducationSection, id: 'education', data: {} },
        ],
        main: [
          { name: 'Summary', component: SummarySection, id: 'summary', data: {} },
          { name: 'Experience', component: ExperienceSection, id: 'experience', data: {} },
        ]
      };
    default:
      return {
        profile: null,
        sidebar: [],
        main: []
      };
  }
};

const components = ref(getCurrentComponents(selectedTemplate.value));
const profileComponent = computed(() => components.value.profile);
const currentSidebarComponents = computed(() => components.value.sidebar);
const currentMainComponents = computed(() => components.value.main);

const switchTemplate = (template) => {
  selectedTemplate.value = template;
  components.value = getCurrentComponents(template);
  localStorage.setItem('selectedTemplate', template); // Store selected template
};

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
  const sourceList = draggingSource.value === 'sidebar' ? currentSidebarComponents.value : currentMainComponents.value;
  const targetList = target === 'sidebar' ? currentSidebarComponents.value : currentMainComponents.value;

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

const downloadPDF = async () => {
  const buttons = document.querySelector('.button-container');
  buttons.style.display = 'none'; // Hide the buttons

  const resumeElement = document.querySelector('.resume');
  const canvas = await html2canvas(resumeElement, { scale: 2 }); // Increase scale for higher quality

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  pdf.save('resume.pdf');

  buttons.style.display = 'flex'; // Show the buttons again
};

const downloadWord = async () => {
  const buttons = document.querySelector('.button-container');
  buttons.style.display = 'none'; // Hide the buttons

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

  buttons.style.display = 'flex'; // Show the buttons again
};
</script>

<style scoped>
.hidden {
  display: none !important;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
