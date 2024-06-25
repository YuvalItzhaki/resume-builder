import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './useAuthStore';
import { ref } from 'vue';

export const useResumeStore = defineStore('resume', () => {
  const authStore = useAuthStore();
  const resumeData = ref(null);

  const fetchResume = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/resumes', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      resumeData.value = response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };
  const fetchResumeById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      resumeData.value = response.data;
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const saveResume = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/resumes',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      resumeData.value = response.data;
      console.log('Resume saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return { resumeData, fetchResume, saveResume, fetchResumeById };
});
