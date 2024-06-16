// src/stores/skillStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSkillStore = defineStore('skill', {
  state: () => ({
    techSkills: []
  }),
  actions:{
    async fetchTechSkills() {
    try {
      const response = await axios.get('http://localhost:5001/api/resumes');
      this.techSkills = response.data.tech_skills;
    } catch (error) {
      console.error('Error fetching tech skills:', error);
    }
},
  }
});
