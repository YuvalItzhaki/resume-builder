import { defineStore } from 'pinia';
import axios from 'axios';

export const useEducationStore = defineStore('education', {
  state: () => ({
    education: [],
  }),
  actions: {
    setEducation(newEducation) {
      this.education = newEducation;
    },
    updateEducationField(index, field, value) {
      this.education[index][field] = value;
    },
    async fetchEducation() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        this.education = response.data.education;
      } catch (error) {
        console.error('Error fetching education:', error);
      }
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
