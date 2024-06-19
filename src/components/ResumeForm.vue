<template>
  <div class="page-container">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="formData.profile.name" type="text" required />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" v-model="formData.profile.title" type="text" required />
      </div>
      <fieldset class="form-group">
        <legend>Contact</legend>
        <div class="contact-group">
          <div class="form-group">
            <label for="contact-email">Email:</label>
            <input id="contact-email" v-model="formData.contact.email" type="email" required />
          </div>
          <div class="form-group">
            <label for="contact-phone">Phone:</label>
            <input id="contact-phone" v-model="formData.contact.phone" type="text" required />
          </div>
          <div class="form-group">
            <label for="contact-linkedin">LinkedIn:</label>
            <input id="contact-linkedin" v-model="formData.contact.linkedin" type="text" required />
          </div>
          <div class="form-group">
            <label for="contact-github">GitHub:</label>
            <input id="contact-github" v-model="formData.contact.github" type="text" required />
          </div>
        </div>
      </fieldset>
      <div class="form-group">
        <label for="tech_skills">Tech Skills:</label>
        <v-select 
          v-model="formData.tech_skills" 
          :options="techSkillsOptions" 
          multiple 
          label="label" 
          placeholder="Select tech skills" 
          :reduce="skill => skill.value"
          style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"
        />
      </div>
      <div class="form-group">
      <label for="languages">Languages:</label>
      <div v-for="(lang, langIndex) in formData.languages" :key="langIndex" class="language-group">
        <v-select 
          v-model="lang.value" 
          :options="languagesOptions.map(l => l.value)" 
          label="label" 
          placeholder="Select language" 
          @input="updateLanguageLevel(langIndex)"
          class="language-select"
        />
        <v-select 
          v-model="lang.level" 
          :options="getLanguageLevels(lang.value)" 
          label="label" 
          placeholder="Select proficiency level" 
          class="level-select"
        />
    </div>
    <button type="button" @click="addLanguage">Add Language</button>
</div>

      <fieldset class="form-group">
        <legend>Education</legend>
        <div v-for="(edu, index) in formData.education" :key="index" class="education-group">
          <div class="form-group">
            <label :for="'institution-' + index">Institution:</label>
            <input :id="'institution-' + index" v-model="edu.institution" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'degree-' + index">Degree:</label>
            <input :id="'degree-' + index" v-model="edu.degree" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'startDate-' + index">Start Date:</label>
            <input :id="'startDate-' + index" v-model="edu.startDate" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'endDate-' + index">End Date:</label>
            <input :id="'endDate-' + index" v-model="edu.endDate" type="text" required />
          </div>
          <button type="button" @click="removeEducation(index)">Remove</button>
        </div>
        <button type="button" @click="addEducation">Add Education</button>
      </fieldset>
      <fieldset class="form-group">
        <legend>Experience</legend>
        <div v-for="(exp, index) in formData.experience" :key="index" class="experience-group">
          <div class="form-group">
            <label :for="'exp-title-' + index">Title:</label>
            <input :id="'exp-title-' + index" v-model="exp.title" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'exp-company-' + index">Company:</label>
            <input :id="'exp-company-' + index" v-model="exp.company" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'exp-startDate-' + index">Start Date:</label>
            <input :id="'exp-startDate-' + index" v-model="exp.startDate" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'exp-endDate-' + index">End Date:</label>
            <input :id="'exp-endDate-' + index" v-model="exp.endDate" type="text" required />
          </div>
          <div class="form-group">
            <label :for="'exp-duties-' + index">Duties:</label>
            <textarea :id="'exp-duties-' + index" v-model="exp.duties" required></textarea>
          </div>
          <button type="button" @click="removeExperience(index)">Remove</button>
        </div>
        <button type="button" @click="addExperience">Add Experience</button>
      </fieldset>
      <div class="form-group">
        <label for="profile">Profile:</label>
        <input id="profile" v-model="formData.summary" type="text" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import { useRouter } from 'vue-router';
import {techSkillsOptions, languagesOptions} from '../data/data.json'

const router = useRouter();

const emit = defineEmits(['submit']);
const formData = ref({
  name: '',
  email: '',
  contact: {
    email: '',
    phone: '',
    linkedin: '',
    github: ''
  },
  tech_skills: [],
  languages: [{ value: '', level: '' }],
  education: [
    {
      institution: '',
      degree: '',
      startDate: '',
      endDate: ''
    }
  ],
  experience: [
    {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      duties: ''
    }
  ],
  profile: {
    name: '',
    title: '',
  },
  summary: '',
});

const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  router.push({ name: 'ResumePreview' });
  emit('submit', formData.value);
};

const addLanguage = () => {
  formData.value.languages.push({ value: '', level: '' });
};

const updateLanguageLevel = (langIndex) => {
  formData.value.languages[langIndex].level = '';  // Reset the level when the language is changed
};

const getLanguageLevels = (language) => {
  const lang = languagesOptions.find(l => l.value === language);
  console.log('lang', lang)
  return lang ? lang.levels : [];
};

const addEducation = () => {
  formData.value.education.push({
    institution: '',
    degree: '',
    startDate: '',
    endDate: ''
  });
};

const removeEducation = (index) => {
  formData.value.education.splice(index, 1);
};

const addExperience = () => {
  formData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    duties: ''
  });
};

const removeExperience = (index) => {
  formData.value.experience.splice(index, 1);
};
</script>


<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 240vh;
  background-color: #f5f5f5;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  width: 100%;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.language-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-select, .level-select {
  flex: 1;
}

.education-group, .experience-group {
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #00796b;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #005f56;
}

fieldset {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}
</style>

