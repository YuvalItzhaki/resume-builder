<template>
  <div class="experience-section">
    <!-- <h2>EXPERIENCE</h2> -->
    <div v-for="job in experienceStore.experience" :key="job.title" class="job">
      <h3>{{ job.title }}</h3>
      <p>{{ job.company }} | {{ job.startDate }} - {{ job.endDate }}</p>
      <ul>
        <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
      </ul>
    </div>
    <!-- <button @click="showEditModal">Edit</button> -->

    <!-- Modal -->
    <!-- <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Experience</h2>

        <div v-if="experienceStore.experience.length">
          <h3>Choose existing experience to edit</h3>
          <ul>
            <li v-for="(exp, index) in experienceStore.experience" :key="index">
              <div @click="editExperience(index)">
                <div>{{ exp.title }}</div>
                <div>{{ exp.company }} | {{ exp.startDate }} - {{ exp.endDate }}</div>
                <ul>
                  <li v-for="duty in exp.duties" :key="duty">{{ duty }}</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <h3>{{ isEditing ? 'Edit Existing Experience' : 'Add New Experience' }}</h3>
        <p>
          <label for="modal-title">
            Title:
            <input id="modal-title" v-model="currentExperience.title" />
          </label>
        </p>
        <p>
          <label for="modal-company">
            Company:
            <input id="modal-company" v-model="currentExperience.company" />
          </label>
        </p>
        <p>
          <label for="modal-startDate">
            Start Date:
            <input id="modal-startDate" v-model="currentExperience.startDate" />
          </label>
        </p>
        <p>
          <label for="modal-endDate">
            End Date:
            <input id="modal-endDate" v-model="currentExperience.endDate" />
          </label>
        </p>
        <p>
          <label for="modal-duties">
            Duties (comma-separated):
            <input id="modal-duties" v-model="dutiesInput" />
          </label>
        </p>
        <button @click="saveExperience">{{ isEditing ? 'Save Changes' : 'Add Experience' }}</button>
        <button @click="cancelEdit">Cancel</button>
        <button @click="prepareNewExperience">Add New Experience</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useExperienceStore } from '../stores/experienceStore';
import { useRoute } from 'vue-router';

const showModal = ref(false);
const isEditing = ref(false);
const currentExperience = ref({ title: '', company: '', startDate: '', endDate: '', duties: [] });
const dutiesInput = ref('');
const currentIndex = ref(-1);
const experienceStore = useExperienceStore();
const route = useRoute();
const id = route.params.id;

onMounted(() => {
  experienceStore.fetchExperience(id);
});

// const showEditModal = () => {
//   showModal.value = true;
//   isEditing.value = false;
//   currentExperience.value = { title: '', company: '', startDate: '', endDate: '', duties: [] };
//   dutiesInput.value = '';
// };

// const editExperience = (index) => {
//   currentIndex.value = index;
//   currentExperience.value = { ...experienceStore.experience[index] };
//   dutiesInput.value = currentExperience.value.duties.join(', ');
//   isEditing.value = true;
// };

// const prepareNewExperience = () => {
//   currentIndex.value = -1;
//   currentExperience.value = { title: '', company: '', startDate: '', endDate: '', duties: [] };
//   dutiesInput.value = '';
//   isEditing.value = false;
// };

// const saveExperience = () => {
//   currentExperience.value.duties = dutiesInput.value.split(',').map(duty => duty.trim());

//   if (isEditing.value && currentIndex.value >= 0) {
//     experienceStore.experience[currentIndex.value] = { ...currentExperience.value };
//   } else {
//     experienceStore.experience.push({ ...currentExperience.value });
//   }

//   experienceStore.setExperience(experienceStore.experience);
//   experienceStore.saveExperience();
//   showModal.value = false;
// };

// const cancelEdit = () => {
//   showModal.value = false;
// };

</script>

<style scoped>
.experience-section {
  margin-top: 20px;
  font-family: 'Times New Roman', Times, serif;
}

.experience-section h2 {
  color: #073763;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.job p, .job h3 {
  font-family: 'Times New Roman', Times, serif;
  margin: 0;
  color: #6c99e1;
}

.job ul {
  margin-top: 10px;
  padding-left: 20px;
  text-align: justify;
}

.job li {
  margin-bottom: 10px;
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
