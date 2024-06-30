import { defineStore } from 'pinia';
import { useResumeStore } from './resumeStore';

export const useContactStore = defineStore('contact', {
  state: () => ({
    contact: {
      email: '',
      phone: '',
      linkedin: '',
      github: '',
    },
  }),
  actions: {
    async fetchContact(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
        this.contact = resumeStore.resumeData[0]?.contact || {};
      }
    },
    setContact(newContact) {
      this.contact = newContact;
    },
    updateContactField(field, value) {
      this.contact[field] = value;
    },
    async saveContact(id) {
      try {
        const resumeStore = useResumeStore();
        await resumeStore.saveResumeById(this.contact, id);
        console.log('Contact saved successfully');
      } catch (error) {
        console.error('Error saving contact data:', error);
      }
    },
  },
});
