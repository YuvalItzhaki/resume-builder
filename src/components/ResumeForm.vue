<template>
  <div class="page-container">
    <el-form :model="resumeData" ref="form" @submit.native.prevent="handleSubmit" label-position="top" class="form-aligned-right">
      <el-card class="form-container">
        <div slot="header">
          <span class="headline">Create New Resume</span>
        </div>

        <!-- Profile Section -->
        <div v-show="currentPage === 'profile'">
          <div class="sub-title">Profile</div>
          <el-form-item label="Name" :rules="[{ required: true, message: 'Name is required', trigger: 'blur' }]">
            <el-input v-model="resumeData.profile.name"></el-input>
          </el-form-item>
          <el-form-item label="Title" :rules="[{ required: true, message: 'Title is required', trigger: 'blur' }]">
            <el-input v-model="resumeData.profile.title"></el-input>
          </el-form-item>
        </div>

        <!-- Contact Section -->
        <div v-show="currentPage === 'contact'">
          <div class="sub-title">Contact</div>
          <el-form-item label="Email" :rules="[{ required: true, type: 'email', message: 'Email is required', trigger: 'blur' }]">
            <el-input v-model="resumeData.contact.email"></el-input>
          </el-form-item>
          <el-form-item label="Phone" :rules="[{ required: true, validator: phoneRule, trigger: 'blur' }]">
            <el-input v-model="resumeData.contact.phone" placeholder="+14155552671"></el-input>
          </el-form-item>
          <el-alert v-if="phoneError" type="error">{{ phoneError }}</el-alert>
          <el-form-item label="LinkedIn" :rules="[{ required: true, message: 'LinkedIn is required', trigger: 'blur' }]">
            <el-input v-model="resumeData.contact.linkedin"></el-input>
          </el-form-item>
          <el-form-item label="GitHub" :rules="[{ required: true, message: 'GitHub is required', trigger: 'blur' }]">
            <el-input v-model="resumeData.contact.github"></el-input>
          </el-form-item>
        </div>

        <!-- Tech Skills Section -->
        <div v-show="currentPage === 'tech-skills'">
          <div class="sub-title">Tech Skills</div>
          <el-form-item label="Tech Skills" :rules="[{ required: true, message: 'Tech Skills are required', trigger: 'change' }]">
            <el-select v-model="resumeData.tech_skills" multiple filterable>
              <el-option v-for="skill in techSkillsOptions" :key="skill.value" :label="skill.label" :value="skill.value"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- Languages Section -->
        <div v-show="currentPage === 'languages'">
          <div class="sub-title">Languages</div>
          <div v-for="(lang, langIndex) in resumeData.languages" :key="langIndex" class="language-row">
            <el-form-item :label="'Language ' + (langIndex + 1)">
              <el-select v-model="lang.value" filterable @change="updateLanguageLevel(langIndex)">
                <el-option v-for="option in languagesOptions" :key="option.value" :label="option.label" :value="option.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'Proficiency Level ' + (langIndex + 1)">
              <el-select v-model="lang.level" filterable>
                <el-option v-for="level in getLanguageLevels(lang.value)" :key="level" :label="level" :value="level"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-button type="text" @click="addLanguage">Add Language</el-button>
        </div>

        <!-- Education Section -->
        <div v-show="currentPage === 'education'">
          <div class="sub-title">Education</div>
          <div v-for="(edu, index) in resumeData.education" :key="index" class="education-row">
            <el-form-item :label="'Institution ' + (index + 1)">
              <el-input v-model="edu.institution"></el-input>
            </el-form-item>
            <el-form-item :label="'Degree ' + (index + 1)">
              <el-input v-model="edu.degree"></el-input>
            </el-form-item>
            <div class="datePicker">
              <el-form-item label="Start Date">
                <el-date-picker v-model="edu.startDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
              <el-form-item label="End Date">
                <el-date-picker v-model="edu.endDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
            </div>
            <el-button type="text" @click="removeEducation(index)">Remove</el-button>
          </div>
          <el-button type="text" @click="addEducation">Add Education</el-button>
        </div>

        <!-- Experience Section -->
        <div v-show="currentPage === 'experience'">
          <div class="sub-title">Experience</div>
          <div v-for="(exp, index) in resumeData.experience" :key="index" class="experience-row">
            <el-form-item :label="'Title ' + (index + 1)">
              <el-input v-model="exp.title"></el-input>
            </el-form-item>
            <el-form-item :label="'Company ' + (index + 1)">
              <el-input v-model="exp.company"></el-input>
            </el-form-item>
            <div class="datePicker">
              <el-form-item label="Start Date">
                <el-date-picker v-model="exp.startDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
              <el-form-item label="End Date">
                <el-date-picker v-model="exp.endDate" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :picker-options="pickerOptions"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item :label="'Duties ' + (index + 1)">
              <el-input type="textarea" v-model="exp.duties"></el-input>
            </el-form-item>
            <el-button type="text" @click="removeExperience(index)">Remove</el-button>
          </div>
          <el-button type="text" @click="addExperience">Add Experience</el-button>
        </div>

        <!-- Summary Section -->
        <div v-show="currentPage === 'summary'">
          <div class="sub-title">Summary</div>
          <el-form-item label="Summary" :rules="[{ required: true, message: 'Summary is required', trigger: 'blur' }]">
            <el-input type="textarea" v-model="resumeData.summary"></el-input>
          </el-form-item>
        </div>

        <!-- Pagination Buttons -->
        <div class="pagination-buttons">
          <el-button type="default" @click="previousSection" :disabled="currentPageIndex === 0">Previous</el-button>
          <el-button type="default" @click="nextSection" :disabled="currentPageIndex === sections.length - 1">Next</el-button>
        </div>

        <!-- Form Actions -->
        <div class="form-actions" v-if="currentPageIndex === sections.length - 1">
          <el-button type="primary" @click="handleSubmit">Submit Resume</el-button>
          <el-button type="default" @click="handleSaveAndPreviewResume">Save & Preview</el-button>
          <el-button type="default" @click="cancelChanges">Cancel</el-button>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { techSkillsOptions, languagesOptions } from '../data/data.json';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';


const router = useRouter();
const route = useRoute();
const form = ref(null);
const authStore = useAuthStore();
const resumeData = ref({
  _id: '',
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
  summary: '', 
  userId: ''
});

const currentPage = ref('profile');
const sections = ref(['profile', 'contact', 'tech-skills', 'languages', 'education', 'experience', 'summary']);
const currentPageIndex = computed(() => sections.value.indexOf(currentPage.value));
const phonePattern = '^\\+?[1-9]\\d{1,14}$';
const phoneError = ref('');
const id = route.params.id;
const submitting = ref(false); // Flag to prevent duplicate submissions

onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/token');
        const token = response.data.token;
        if (token) {
          authStore.user.token = token;
          // Optionally fetch user details using the token if needed
          // await authStore.fetchCurrentUser();
          console.log('Token after fetch:', authStore.user.token);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    });


const phoneRule = (rule, value, callback) => {
  if (value.match(phonePattern)) {
    phoneError.value = '';
    callback();
  } else {
    phoneError.value = 'Phone number format is invalid';
    callback(new Error('Phone number format is invalid'));
  }
};

const handleSubmit = async () => {
  if (submitting.value) return; // Prevent multiple submissions
  submitting.value = true;

  if (form.value.validate()) {
    try {
      resumeData.value.userId = authStore.user.user._id; 
      await axios.post('http://localhost:5001/api/resumes', resumeData.value, {
        headers: {
          Authorization: `Bearer ${authStore.user.token}`
        }
      });
      router.push({ name: 'MyResume' });
    } catch (error) {
      console.error('Error updating resume:', error);
    } finally {
      submitting.value = false; // Reset flag after submission
    }
  } else {
    submitting.value = false; // Reset flag if validation fails
  }
};


const handleSaveAndPreviewResume = async () => {
  if (submitting.value) return; // Prevent multiple submissions
  submitting.value = true;

  try {
    // Ensure userId is set
    resumeData.value.userId = authStore.user.user._id; 
    console.log('resumeData before POST:', resumeData.value); // Debugging log

    await axios.post(`http://localhost:5001/api/resumes`, resumeData.value, {
      headers: {
        Authorization: `Bearer ${authStore.user.token}`
      }
    });

    const getResponse = await axios.get(`http://localhost:5001/api/resumes`);
    const resumes = getResponse.data;
    if (resumes.length > 0) {
      const latestResume = resumes[resumes.length - 1];
      Object.assign(resumeData.value, latestResume);
      router.push({
        path: `/resume-preview/${resumeData.value._id}`,
        state: { resumeData: resumeData.value }
      });
    } else {
      console.error('No resumes found');
    }
  } catch (error) {
    console.error('Error saving resume:', error);
  } finally {
    submitting.value = false; // Reset flag after submission
  }
};


const addLanguage = () => {
  resumeData.value.languages.push({ value: '', level: '' });
};

const addEducation = () => {
  resumeData.value.education.push({
    institution: '',
    degree: '',
    startDate: '',
    endDate: ''
  });
};

const removeEducation = (index) => {
  if (resumeData.value.education.length > 1) {
    resumeData.value.education.splice(index, 1);
  }
};

const addExperience = () => {
  resumeData.value.experience.push({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    duties: ''
  });
};

const removeExperience = (index) => {
  if (resumeData.value.experience.length > 1) {
    resumeData.value.experience.splice(index, 1);
  }
};

const updateLanguageLevel = (langIndex) => {
  const selectedLanguage = resumeData.value.languages[langIndex].value;
  const selectedLanguageObj = languagesOptions.find(l => l.value === selectedLanguage);
  if (selectedLanguageObj) {
    resumeData.value.languages[langIndex].level = selectedLanguageObj.levels[0].value;
  }
};

const getLanguageLevels = (language) => {
  const selectedLanguage = languagesOptions.find(l => l.value === language);
  return selectedLanguage ? selectedLanguage.levels.map(l => l) : [];
};

const pickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  }
};

const cancelChanges = () => {
  router.push('/resume-list');
};

const nextSection = () => {
  if (currentPageIndex.value < sections.value.length - 1) {
    currentPage.value = sections.value[currentPageIndex.value + 1];
  }
};

const previousSection = () => {
  if (currentPageIndex.value > 0) {
    currentPage.value = sections.value[currentPageIndex.value - 1];
  }
};
</script>

<style>
.page-container {
  max-width: 700px;
  margin: auto;
}

.form-container {
  padding: 30px;
}

.sub-title {
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.language-row, .education-row, .experience-row {
  margin-bottom: 20px;
}

.el-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-aligned-right .el-form-item__content {
  text-align: right;
}

.datePicker {
  display: flex;
  justify-content: space-between;
}

.headline {
  font-family: 'Times New Roman', Times, serif;
  font-size: 26px;
  display: flex;
  justify-content: center;
  color: red;
}

.pagination-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
