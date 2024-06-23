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
    async fetchProfile() {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResume();
      }
      this.profile = resumeStore.resumeData.profile;
    },
    // async fetchProfile() {
    //   try {
    //     const response = await axios.get('http://localhost:5001/api/resumes');
    //     if (response.data && response.data.profile) {
    //       this.profile = response.data.profile;
    //     } else {
    //       console.error('Profile data is missing in the response');
    //     }
    //   } catch (error) {
    //     console.error('Failed to fetch profile:', error);
    //   }
    // },
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
