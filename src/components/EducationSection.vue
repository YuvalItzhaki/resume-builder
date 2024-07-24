<template>
  <div class="education-section">
    <!-- <h2>EDUCATION</h2> -->
    <ul>
      <li v-for="(edu, index) in education" :key="index" class="education-item">
        <div class="institution-degree">
          <strong>{{ edu.institution }}</strong> - {{ edu.degree }}
        </div>
        <div class="dates">
          <span>{{ edu.startDate }}</span> - <span>{{ edu.endDate }}</span>
        </div>
      </li>
    </ul>
    <!-- <button @click="showEditModal">Edit</button> -->

    <!-- Modal -->
    <!-- <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Education</h2>
        
        <div v-if="education.length">
          <h3>Choose existing education to edit</h3>
          <ul>
            <li v-for="(edu, index) in education" :key="index">
              <div @click="editEducation(index)">
                <strong>{{ edu.institution }}</strong> - {{ edu.degree }}
                <div>{{ edu.startDate }} - {{ edu.endDate }}</div>
              </div>
            </li>
          </ul>
        </div>

        <h3>{{ isEditing ? 'Edit existion details' : 'Add new education' }}</h3>
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
        <button @click="saveEducation">{{ isEditing ? 'Save Changes' : 'Add Education' }}</button>
        <button @click="cancelEdit">Cancel</button>
        <button @click="prepareNewEducation">Add New Education</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useEducationStore } from '../stores/educationStore';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id;

const showModal = ref(false);
const isEditing = ref(false);
const currentEducation = ref({});
const currentIndex = ref(-1);
const education = ref([]);

const educationStore = useEducationStore();

onMounted(() => {
  educationStore.fetchEducation(id);
});

watch(
  () => educationStore.education,
  (newEducation) => {
    education.value = [...newEducation];
  },
  { deep: true }
);

// const showEditModal = () => {
//   showModal.value = true;
//   isEditing.value = false;
//   currentEducation.value = { institution: '', degree: '', startDate: '', endDate: '' };
// };

// const prepareNewEducation = () => {
//   currentIndex.value = -1;
//   currentEducation.value = { institution: '', degree: '', startDate: '', endDate: '' };
//   isEditing.value = false;
// };

// const editEducation = (index) => {
//   currentIndex.value = index;
//   currentEducation.value = { ...education.value[index] };
//   isEditing.value = true;
// };

// const saveEducation = () => {
//   if (isEditing.value && currentIndex.value >= 0) {
//     // Edit existing education
//     education.value[currentIndex.value] = { ...currentEducation.value };
//   } else {
//     // Add new education
//     education.value.push({ ...currentEducation.value });
//   }
//   educationStore.setEducation(education.value);
//   educationStore.saveEducation();
//   showModal.value = false;
// };

// const cancelEdit = () => {
//   showModal.value = false;
// };
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
  margin-right: 20px;
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
