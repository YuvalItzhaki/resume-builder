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
            handle: '.handle',
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
          <span class="handle">☰</span>
          <component :is="item.component" />
          <button @click="editComponent(item)">Edit</button>
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
            handle: '.handle',
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
          <span class="handle">☰</span>
          <component :is="item.component" />
          <button @click="editComponent(item)">Edit</button>
        </div>
      </section>
    </main>
    <div v-if="isEditing" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Component</h2>
        <component :is="editingComponent.component" :editable="true" :contact="editingComponent.data" @update-contact="updateContact" />
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
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

const isEditing = ref(false);
const editingComponent = ref(null);

function onUpdate() {
  console.log('update');
}

function onAdd() {
  console.log('add');
}

function onRemove() {
  console.log('remove');
}

function editComponent(item) {
  editingComponent.value = { ...item };
  isEditing.value = true;
}

function updateContact(newData) {
  editingComponent.value.data = newData;
  console.log('pppp', newData)
}

function saveEdit() {
  const targetList = sidebarComponents.value.concat(mainComponents.value);
  const index = targetList.findIndex(c => c.id === editingComponent.value.id);
  console.log('gggg', editingComponent.value.id)
  if (index !== -1) {
    targetList[index].data = editingComponent.value.data;
    console.log('llll', editingComponent.value)
  }
  isEditing.value = false;
}
function cancelEdit() {
  isEditing.value = false;
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

.handle {
  display: block;
  margin-bottom: 5px;
  cursor: move;
  color: #00796b;
  font-weight: bold;
}

.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}
</style>
