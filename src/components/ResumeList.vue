<template>
    <div>
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item._id">
            <td>{{ item._id }}</td>
            <td>
              <ul>
                <li>{{ item.profile.name }}</li>
                <li>{{ item.profile.title }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>{{ item.contact.email }}</li>
                <li>{{ item.contact.linkedin }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(education, index) in item.education" :key="index">
                  {{ education.institution }} - {{ education.degree }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(skill, index) in item.tech_skills" :key="index">{{ skill }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(language, index) in item.languages" :key="index">
                  {{ language.value }} ({{ language.level }})
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(exp, index) in item.experience" :key="index">
                  {{ exp.title }} at {{ exp.company }}
                </li>
              </ul>
            </td>
            <td>{{ item.summary }}</td>
            <td>
              <div class="action-buttons">
                <button @click="editItem(item)">Edit</button>
                <button @click="deleteItem(item)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const headers = ref([
    'Id', 'Profile', 'Contact', 'Education', 'Tech Skills', 'Languages', 'Experience', 'Summary'
  ]);
  
  const items = ref([]);
  
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5001/api/resumes');
      items.value = response.data;
      console.log('Fetched items:', items.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  async function editItem(item) {
    
    const id = item._id
    console.log('Edit item:', id);
    // try {
    //   const response = await axios.delete('http://localhost:5001/api/resumes');
    //   items.value = response.data;
    //   console.log('Fetched items:', items.value);
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // }
  }
  
  async function deleteItem(item) {
    const id = item._id
    console.log('Delete item:', id);
    try {
      const response = await axios.delete(`http://localhost:5001/api/resumes/${id}`);
      items.value = response.data;
      console.log('Fetched items:', items.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-right: 5px; /* Add space between buttons */
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .action-buttons {
    display: flex;
  }
  </style>
  