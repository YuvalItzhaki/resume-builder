<template>
    <div class="languages-section">
      <h2>LANGUAGES</h2>
      <ul>
        <li v-for="language in languages" :key="language"><strong>{{ language.value }}</strong> | {{ language.level }}</li>
      </ul>
    </div>
    <button @click="editLanguages">Edit</button>

    <!-- Modal -->
    <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Languages</h2>
        <div>
          <label for="predefined-language">Add from list:</label>
          <select id="predefined-language" v-model="selectedPredefinedLanguage">
            <option disabled value="">Select language</option>
            <option v-for="language in predefinedLanguage" :key="language" :value="language.value">{{ language.value }}</option>
          </select>
          <select id="predefined-language" v-model="selectedPredefinedLanguage">
            <option disabled value="">Select level</option>
            <option v-for="level in predefinedLanguage[0].levels" :key="level" :value="level">{{ level }}</option>
          </select>
          <button @click="addPredefinedLanguage">Add</button>
        </div>
        <div>
          <label for="new-language">Add New Language:</label>
          <input id="new-language" v-model="newLanguage" />
          <button @click="addLanguage">Add</button>
        </div>
        <ul>
          <li v-for="language in languages" :key="language.value">
            <strong>{{ language.value }} {{ language.level }}</strong>
            <button @click="removeLanguage(language)">Remove</button>
          </li>
        </ul>
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted, computed } from 'vue';
import { useLanguageStore } from '../stores/languageStore';
import languagesOptions from '../data/data.json'

// const languages = ref([]);

const languageStore = useLanguageStore();

const showModal = ref(false);
const newLanguage = ref('');
const selectedPredefinedLanguage = ref({});
const predefinedLanguage = ref([{}]);

const languages = computed(() => languageStore.languages);

onMounted(() => {
  languageStore.fetchLanguages();
  predefinedLanguage.value = languagesOptions.languagesOptions;
});

const editLanguages = () => {
  showModal.value = true;
};

const addLanguage = () => {
  if (newLanguage.value.trim() && newLanguage.level.trim()) {
    languageStore.addLanguages({ value: newLanguage.value.trim(), level: newLanguage.level.trim() });
    newLanguage.value = {};
    newLanguage.level = {};
  }
};

const addPredefinedLanguage = () => {
  if (selectedPredefinedLanguage.value) {
    languageStore.addLanguages([selectedPredefinedLanguage.value]);
    selectedPredefinedLanguage.value = '';
  }
};

const removeLanguage = (language) => {
  languageStore.removeLanguage(language);
};

const saveEdit = () => {
  languageStore.saveLanguages();
  showModal.value = false;
};

const cancelEdit = () => {
  showModal.value = false;
};
</script>

<style scoped>
.languages-section {
  font-family: 'Times New Roman', Times, serif;
}

.languages-section h2 {
  color: #073763;
  padding: 4px;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.languages-section ul {
  margin: 5px 0;
  padding-left: 20px;
}

.languages-section li {
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
