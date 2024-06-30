import { defineStore } from 'pinia';
import axios from 'axios';
import { useResumeStore } from './resumeStore';

export const useSummaryStore = defineStore('summaryStore', {
  state: () => ({
    summary: ''
  }),

  actions: {
    async fetchSummary(id) {
      const resumeStore = useResumeStore();
      if (!resumeStore.resumeData) {
        await resumeStore.fetchResumeById(id);
      }
      this.summary = resumeStore.resumeData[0]?.summary || '';
    },

    async saveSummary(id) {
      try {
        const resumeStore = useResumeStore();
        await resumeStore.saveResumeById(this.summary, id);
        console.log('Summary saved successfully', this.summary);
      } catch (error) {
        console.error('Failed to save summary:', error);
      }
    }
  }
});
