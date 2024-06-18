// stores/skillStore.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    tech_skills: []
  }),
  actions: {
    async fetchTechSkills() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        this.tech_skills = response.data.tech_skills;
      } catch (error) {
        console.error('Failed to fetch tech skills:', error);
      }
    },
    addSkill(skill) {
      if (!this.tech_skills.includes(skill)) {
        this.tech_skills.push(skill);
      }
    },
    removeSkill(skill) {
      this.tech_skills = this.tech_skills.filter(s => s !== skill);
    },
    async saveSkills() {
      try {
        await axios.put('http://localhost:5001/api/resumes/tech_skills', { tech_skills: this.tech_skills });
      } catch (error) {
        console.error('Failed to save tech skills:', error);
      }
    }
  }
});
