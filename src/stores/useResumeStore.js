import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './user';

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resumes: [],
  }),
  actions: {
    async saveResume(resumeData) {
      const authStore = useAuthStore();
      const token = authStore.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.post('http://localhost:5001/api/resumes', resumeData, config);
        this.resumes.push(response.data);
        console.log('Resume saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving resume:', error.response ? error.response.data : error.message);
      }
    },
  },
});
