import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    tech_skills: []
  }),
  actions: {
    async fetchTechSkills(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
      }
      this.tech_skills = resumeStore.resumeData[0]?.tech_skills || [];
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
