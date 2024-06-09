// // src/stores/resume.js
// import { defineStore } from 'pinia';
// import api from "../services/api";

// export const useResumeStore = defineStore('resume', {
//   state: () => ({
//     resume: {},
//   }),
//   actions: {
//     async saveResume(resumeData) {
//       const response = await api.post('/resumes', resumeData);
//       this.resume = response.data;
//     },
//   },
//   getters: {
//     getResume: (state) => state.resume,
//   },
// });

import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './user'; // Ensure the path and export name are correct

export const useResumeStore = defineStore('resume', {
  state: () => ({}),
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
        console.log('Resume saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving resume:', error.response ? error.response.data : error.message);
      }
    },
  },
});
