<template>
  <div class="skills-section">
    <!-- <h2>TECH SKILLS</h2> -->
    <div class="two-columns">
    <ul>
      <li v-for="skill in techSkills" :key="skill">{{ skill }}</li>
    </ul>
  </div>
    <!-- <button @click="editSkills">Edit</button> -->

    <!-- Modal -->
    <!-- <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Skills</h2>
        <div>
          <label for="predefined-skill">Add from list:</label>
          <select id="predefined-skill" v-model="selectedPredefinedSkill">
            <option disabled value="">Select a skill</option>
            <option v-for="skill in predefinedSkills" :key="skill" :value="skill.value">{{ skill.value }}</option>
          </select>
          <button @click="addPredefinedSkill">Add</button>
        </div>
        <div>
          <label for="new-skill">Add New Skill:</label>
          <input id="new-skill" v-model="newSkill" />
          <button @click="addSkill">Add</button>
        </div>
        <ul>
          <li v-for="skill in techSkills" :key="skill.value">
            <strong>{{ skill }}</strong>
            <button @click="removeSkill(skill)">Remove</button>
          </li>
        </ul>
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSkillStore } from '../stores/skillStore';
import axios from 'axios';
import techSkillsOptions from '../data/data.json'
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const skillStore = useSkillStore();

const showModal = ref(false);
const newSkill = ref('');
const selectedPredefinedSkill = ref({});
const predefinedSkills = ref([{}]);

const techSkills = computed(() => skillStore.tech_skills);

onMounted(async () => {
  skillStore.fetchTechSkills(id);
  const response = techSkillsOptions;
  predefinedSkills.value = response.techSkillsOptions;
});

// const editSkills = () => {
//   showModal.value = true;
// };

// const addSkill = () => {
//   if (newSkill.value.trim()) {
//     skillStore.addSkill(newSkill.value.trim());
//     newSkill.value = '';
//   }
// };

// const addPredefinedSkill = () => {
//   if (selectedPredefinedSkill.value) {
//     skillStore.addSkill(selectedPredefinedSkill.value);
//     selectedPredefinedSkill.value = '';
//   }
// };

// const removeSkill = (skill) => {
//   skillStore.removeSkill(skill);
// };

// const saveEdit = () => {
//   skillStore.saveSkills();
//   showModal.value = false;
// };

// const cancelEdit = () => {
//   showModal.value = false;
// };

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
  list-style-type: disc;
  margin-bottom: 5px;
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
div.two-columns {
  column-count: 2;
  column-gap: 20px;
}

</style>
