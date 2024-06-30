import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useExperienceStore = defineStore('experienceStore', {
  state: () => ({
    experience: [],
  }),
  actions: {
    async fetchExperience(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
      }
      this.experience = resumeStore.resumeData[0]?.experience || [];
    },

    setExperience(newExperience) {
      this.experience = newExperience;
    },

    updateExperienceField(index, field, value) {
      this.experience[index][field] = value;
    },
 
    async saveExperience() {
      try {
        await axios.put('http://localhost:5001/api/resumes/experience', this.experience);
        console.log('Experience saved successfully', this.experience);
      } catch (error) {
        console.error('Error saving experience data:', error);
      }
    },
  },
});
