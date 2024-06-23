import { defineStore } from 'pinia';
import axios from 'axios';
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
    async fetchContact() {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResume();
      }
      this.contact = resumeStore.resumeData.contact || [];
    },
    setContact(newContact) {
      this.contact = newContact;
    },
    updateContactField(field, value) {
      this.contact[field] = value;
    },
    // async fetchContact() {
    //   try {
    //     const response = await axios.get('http://localhost:5001/api/resumes');
    //     this.contact = response.data.contact;
    //   } catch (error) {
    //     console.error('Error fetching contact data:', error);
    //   }
    // },
    async saveContact() {
      try {
        await axios.put('http://localhost:5001/api/resumes', this.contact);
        console.log('Contact saved successfully');
      } catch (error) {
        console.error('Error saving contact data:', error);
      }
    },
  },
});
