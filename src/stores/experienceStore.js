import { defineStore } from 'pinia';
import axios from 'axios';

export const useExperienceStore = defineStore('experienceStore', {
  state: () => ({
    experience: [],
  }),
  actions: {
    setExperience(newExperience) {
      this.experience = newExperience;
    },
    updateExperienceField(index, field, value) {
      this.experience[index][field] = value;
    },
    async fetchExperience() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        this.experience = response.data.experience;
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
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
