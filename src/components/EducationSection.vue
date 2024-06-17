<template>
  <div class="education-section">
    <h2>EDUCATION</h2>
    <ul>
      <li v-for="(edu, index) in education" :key="index" class="education-item">
        <div class="institution-degree">
          <strong>{{ edu.institution }}</strong> - {{ edu.degree }}
        </div>
        <div class="dates">
          <span>{{ edu.startDate }}</span> - <span>{{ edu.endDate }}</span>
        </div>
        <button @click="editEducation(index)">Edit</button>
      </li>
    </ul>

    <!-- Modal -->
    <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Education</h2>
        <p>
          <label for="modal-edu-institution">
            Institution:
            <input id="modal-edu-institution" v-model="currentEducation.institution" />
          </label>
        </p>
        <p>
          <label for="modal-edu-degree">
            Degree:
            <input id="modal-edu-degree" v-model="currentEducation.degree" />
          </label>
        </p>
        <p>
          <label for="modal-edu-startDate">
            Start Date:
            <input id="modal-edu-startDate" v-model="currentEducation.startDate" />
          </label>
        </p>
        <p>
          <label for="modal-edu-endDate">
            End Date:
            <input id="modal-edu-endDate" v-model="currentEducation.endDate" />
          </label>
        </p>
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useEducationStore } from '../stores/educationStore';

const isEditing = ref(false);
const showModal = ref(false);
const currentEducation = ref({});
const currentIndex = ref(-1);

const educationStore = useEducationStore();

onMounted(() => {
  educationStore.fetchEducation();
});

// Ensure education is always treated as an array
const education = ref([]);

watch(
  () => educationStore.education,
  (newEducation) => {
    // Assuming educationStore.education is an array
    education.value = [...newEducation];
  },
  { deep: true }
);

const editEducation = (index) => {
  currentIndex.value = index;
  currentEducation.value = { ...education.value[index] };
  showModal.value = true;
  isEditing.value = true;
};

const saveEdit = () => {
  education.value[currentIndex.value] = { ...currentEducation.value };
  educationStore.setEducation(education.value);
  educationStore.saveEducation();
  showModal.value = false;
  isEditing.value = false;
};

const cancelEdit = () => {
  showModal.value = false;
  isEditing.value = false;
};
</script>

<style scoped>
.education-section {
  font-family: 'Times New Roman', Times, serif;
}

.education-section h2 {
  color: #073763;
  padding: 4px;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.education-section ul {
  margin: 5px 0;
  padding-left: 20px;
}

button {
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 10px;
  color: black;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 4px;
}

button:hover {
  background-color: #6c99e1;
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
