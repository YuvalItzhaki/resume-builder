import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';

export const useResumeStore = defineStore('resume', () => {
  const authStore = useAuthStore();

  const saveResume = async (resumeData) => {
    try {
      console.log('Saving resume data:', resumeData);
      const response = await axios.post(
        'http://localhost:5001/api/resumes',
        resumeData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      console.log('Resume saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return { saveResume };
});
