import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useEducationStore = defineStore('educationStore', {
  state: () => ({
    education: [],
  }),
  actions: {
    async fetchEducation(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
      }
      this.education = resumeStore.resumeData[0]?.education || [];
    },

    setEducation(newEducation) {
      this.education = newEducation;
    },

    updateEducationField(index, field, value) {
      this.education[index][field] = value;
    },

    async saveEducation() {
      try {
        await axios.put('http://localhost:5001/api/resumes/education', this.education);
        console.log('Education saved successfully', this.education);
      } catch (error) {
        console.log('this.education', this.education);
        console.error('Error saving education data:', error);
      }
    },
  },
});
