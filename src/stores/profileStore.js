import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: {
      name: '',
      title: '',
    },
  }),

  actions: {
    async fetchProfile(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
        this.profile = resumeStore.resumeData[0]?.profile || {};
      }
    },

    setProfile(newProfile) {
      this.profile = newProfile;
    },

    async saveProfile() {
      try {
        await axios.put('http://localhost:5001/api/resumes/profile', { profile: this.profile });
        console.log('Profile saved successfully', this.profile);
      } catch (error) {
        console.error('Failed to save profile:', error);
      }
    }
  }
});
