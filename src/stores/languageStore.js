
import { defineStore } from 'pinia';
import axios from 'axios';

export const useLanguageStore = defineStore('languageStore', {
  state: () => ({
    languages: []
  }),
  actions: {
    async fetchLanguages() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        this.languages = response.data.languages;
      } catch (error) {
        console.error('Failed to fetch languages:', error);
      }
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
