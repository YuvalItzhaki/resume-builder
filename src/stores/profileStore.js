import { defineStore } from 'pinia';
import axios from 'axios';

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: {
      name: '',
      title: '',
    },
  }),

  actions: {
    async fetchProfile() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        if (response.data && response.data.profile) {
          this.profile = response.data.profile;
        } else {
          console.error('Profile data is missing in the response');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
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
