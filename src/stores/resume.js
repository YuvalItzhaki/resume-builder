// src/stores/resume.js
import { defineStore } from 'pinia';
import api from "../services/api";

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resume: {},
  }),
  actions: {
    async saveResume(resumeData) {
      const response = await api.post('/resumes', resumeData);
      this.resume = response.data;
    },
  },
  getters: {
    getResume: (state) => state.resume,
  },
});

