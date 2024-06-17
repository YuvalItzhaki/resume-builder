// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useLanguageStore = defineStore('language', {
//     state: () => ({
//         language: [],
//       }),
//   actions:{
//     async fetchLanguage() {
//     try {
//       const response = await axios.get('http://localhost:5001/api/resumes');
//       this.language = response.data.language;
//     } catch (error) {
//       console.error('Error fetching language:', error);
//     }
//     },
//     async saveLanguage() {
//         try {
//         await axios.put('http://localhost:5001/api/resumes/language', this.language);
//         console.log('Language saved successfully');
//         } catch (error) {
//         console.log('this.language', this.language)
//         console.error('Error saving language data:', error);
//         }
//     },
//     setLanguage(newLanguage) {
//         this.language = newLanguage;
//       },
//       updateLanguageField(index,field, value) {
//         this.language[index][field] = value;
//       },
//   }
// });
