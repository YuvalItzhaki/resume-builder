import { defineStore } from 'pinia';
import axios from 'axios';

export const useSummaryStore = defineStore('summaryStore', {
  state: () => ({
    summary: ''
  }),

  actions: {
    async fetchSummary() {
      try {
        const response = await axios.get('http://localhost:5001/api/resumes');
        this.summary = response.data.summary;
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      }
    },
    async saveSummary() {
      try {
        await axios.put('http://localhost:5001/api/resumes/summary', { summary: this.summary });
        console.log('Summary saved successfully', this.summary);
      } catch (error) {
        console.error('Failed to save summary:', error);
      }
    }
  }
});
