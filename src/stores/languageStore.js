
import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useLanguageStore = defineStore('languageStore', {
  state: () => ({
    languages: []
  }),
  actions: {
    async fetchLanguages(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
      }
      this.languages = resumeStore.resumeData[0]?.languages || [];
    },

    addLanguages(language) {
        const languageExists = this.languages.some(lang => lang.value === language.value);
        if (!languageExists) {
          this.languages.push(language);
        }
      },
    removeLanguage(language) {
    this.languages = this.languages.filter(lang => lang.value !== language.value);
    },
    async saveLanguages() {
      try {
        await axios.put('http://localhost:5001/api/resumes/languages', { languages: this.languages });
      } catch (error) {
        console.error('Failed to save languages:', error);
      }
    }
  }
});
