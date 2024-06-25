<template>
  <v-container class="page-container">
    <v-form  @submit.prevent="handleSubmit" ref="form">
      <v-card class="form-container">
        <v-card-title>
          <span class="headline">Profile Form</span>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.profile.name"
                label="Name"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formData.profile.title"
                label="Title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-card-subtitle>Contact</v-card-subtitle>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.contact.email"
                label="Email"
                type="email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formData.contact.phone"
                label="Phone"
                type="tel"
                required
                :rules="[phoneRule]"
                placeholder="+14155552671"
              ></v-text-field>
              <v-alert v-if="phoneError" type="error">{{ phoneError }}</v-alert>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formData.contact.linkedin"
                label="LinkedIn"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formData.contact.github"
                label="GitHub"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-card-subtitle>Tech Skills</v-card-subtitle>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="formData.tech_skills"
                :items="techSkillsOptions"
                item-title="label"
                item-value="value"
                label="Tech Skills"
                multiple
                chips
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-card-subtitle>Languages</v-card-subtitle>

          <v-row v-for="(lang, langIndex) in formData.languages" :key="langIndex">
            <v-col cols="6">
              <v-autocomplete
                v-model="lang.value"
                :items="languagesOptions.map(l => l.value)"
                label="Language"
                @input="updateLanguageLevel(langIndex)"
                required
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="lang.level"
                :items="getLanguageLevels(lang.value)"
                label="Proficiency Level"
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
          <div class="mb-4">
            <v-btn text @click="addLanguage">Add Language</v-btn>
          </div>
          <v-divider></v-divider>

          <v-card-subtitle>Education</v-card-subtitle>

          <v-row v-for="(edu, index) in formData.education" :key="index">
            <v-col cols="12">
              <v-text-field
                v-model="edu.institution"
                :label="'Institution ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="edu.degree"
                :label="'Degree ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="edu.startDate"
                :label="'Start Date ' + (index + 1)"
                outlined
                readonly
                @click="openDatePicker(index, 'start')"
                required
              ></v-text-field>
              <v-date-picker
                v-if="edu.showStartDatePicker"
                v-model="edu.startDate"
                :label="'Start Date ' + (index + 1)"
                @input="closeDatePicker(index, 'start')"
                ref="datePickerStart"
              ></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="edu.endDate"
                :label="'End Date ' + (index + 1)"
                outlined
                readonly
                @click="openDatePicker(index, 'end')"
                required
              ></v-text-field>
              <v-date-picker
                v-if="edu.showEndDatePicker"
                v-model="edu.endDate"
                :label="'End Date ' + (index + 1)"
                @input="closeDatePicker(index, 'end')"
                ref="datePickerEnd"
              ></v-date-picker>
            </v-col>
          </v-row>
          <div class="mb-4">
            <v-btn text @click="addEducation">Add Education</v-btn>
            <v-btn text @click="removeEducation(index)">Remove</v-btn>
          </div>
          <v-divider></v-divider>
          <v-divider></v-divider>

          <v-card-subtitle>Experience</v-card-subtitle>

          <v-row v-for="(exp, index) in formData.experience" :key="index">
            <v-col cols="12">
              <v-text-field
                v-model="exp.title"
                :label="'Title ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="exp.company"
                :label="'Company ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="exp.startDate"
                :label="'Start Date ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="exp.endDate"
                :label="'End Date ' + (index + 1)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="exp.duties"
                :label="'Duties ' + (index + 1)"
                required
              ></v-textarea>
            </v-col>
          </v-row>
          <div class="mb-4">
            <v-btn text @click="addExperience">Add Experience</v-btn>
            <v-btn text @click="removeExperience(index)">Remove</v-btn>
          </div>
          <v-divider></v-divider>

          <v-card-subtitle>Profile</v-card-subtitle>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="formData.summary"
                label="Summary"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn type="submit" color="primary">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { techSkillsOptions, languagesOptions } from '../data/data.json';
// import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'

const router = useRouter();
const emit = defineEmits(['submit']);
const form = ref(null);
const formData = ref({
  profile: {
    name: '',
    title: ''
  },
  contact: {
    email: '',
    phone: '',
    linkedin: '',
    github: ''
  },
  tech_skills: [],
  languages: [{ value: '', level: '' }],
  education: [{
    institution: '',
    degree: '',
    startDate: null,
    endDate: null,
    showStartDatePicker: false,
    showEndDatePicker: false
  }],
  experience: [{
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    duties: ''
  }],
  summary: ''
});

const phonePattern = '^\\+?[1-9]\\d{1,14}$';
const phoneError = ref('');

const handleSubmit = () => {
  if (form.value.validate()) {
    console.log('Form submitted:', formData.value);
    router.push({ name: 'ResumePreview' });
    emit('submit', formData.value);
  }
};

const addLanguage = () => {
  formData.value.languages.push({ value: '', level: '' });
};

const updateLanguageLevel = (langIndex) => {
  formData.value.languages[langIndex].level = ''; 
} ;

const getLanguageLevels = (language) => {
  const lang = languagesOptions.find(l => l.value === language);
  return lang ? lang.levels : [];
};

const addEducation = () => {
  formData.value.education.push({
    institution: '',
    degree: '',
    startDate: null,
    endDate: null,
    showStartDatePicker: false,
    showEndDatePicker: false
  });
};

const removeEducation = (index) => {
  formData.value.education.splice(index, 1);
};

const openDatePicker = (index, type) => {
  if (type === 'start') {
    formData.value.education[index].showStartDatePicker = true;
  } else if (type === 'end') {
    formData.value.education[index].showEndDatePicker = true;
  }
};

const closeDatePicker = (index, type) => {
  if (type === 'start') {
    formData.value.education[index].showStartDatePicker = false;
  } else if (type === 'end') {
    formData.value.education[index].showEndDatePicker = false;
  }
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
const phoneRule = (value) => {
  const regex = new RegExp(phonePattern);
  return regex.test(value) || 'Invalid phone number format';
};

</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.form-container {
  width: 100%;
  max-width: 800px;
  padding: 20px;
}

.language-group,
.education-group,
.experience-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.language-select,
.level-select {
  flex: 1;
}

.v-card-title,
.v-card-subtitle {
  text-align: center;
}

.v-btn {
  margin-top: 15px;
}
.mb-4 {
  margin-bottom: 16px;
}
</style>
