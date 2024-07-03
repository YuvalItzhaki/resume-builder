<template>
  <div>
    <el-table :data="items" style="width: 100%">
      <el-table-column label="Id">
        <template #default="scope">
          {{ scope.row._id }}
        </template>
      </el-table-column>
      <el-table-column label="Profile">
        <template #default="scope">
          <ul>
            <li>{{ scope.row.profile?.name }}</li>
            <li>{{ scope.row.profile?.title }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Contact">
        <template #default="scope">
          <ul>
            <li>{{ scope.row.contact?.email }}</li>
            <li>{{ scope.row.contact?.linkedin }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Education">
        <template #default="scope">
          <ul>
            <li v-for="(education, index) in scope.row.education ?? []" :key="index">
              {{ education.institution }} - {{ education.degree }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Tech Skills">
        <template #default="scope">
          <ul>
            <li v-for="(skill, index) in scope.row.tech_skills ?? []" :key="index">{{ skill }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Languages">
        <template #default="scope">
          <ul>
            <li v-for="(language, index) in scope.row.languages ?? []" :key="index">
              {{ language.value }} ({{ language.level }})
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Experience">
        <template #default="scope">
          <ul>
            <li v-for="(exp, index) in scope.row.experience ?? []" :key="index">
              {{ exp.title }} at {{ exp.company }}
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Summary">
        <template #default="scope">
          {{ scope.row.summary }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <div class="action-buttons">
            <el-button type="primary" @click="editItem(scope.row)">Edit</el-button>
            <el-button type="danger" @click="deleteItem(scope.row)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([]);

const headers = ref([
  'Id', 'Profile', 'Contact', 'Education', 'Tech Skills', 'Languages', 'Experience', 'Summary'
]);

async function fetchData() {
  try {
    const response = await axios.get('http://localhost:5001/api/resumes');
    items.value = response.data;
    console.log('Fetched items:', items.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const navigate = (path) => {
  router.push(path);
};

async function editItem(item) {
  const id = item._id;
  console.log('Edit item:', id);
  navigate(`/edit-resume/${id}`);
}

async function deleteItem(item) {
  const id = item._id;
  console.log('Delete item:', id);
  try {
    await axios.delete(`http://localhost:5001/api/resumes/${id}`);
    items.value = items.value.filter(i => i._id !== id);
    console.log('Deleted item:', id);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
}

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.el-button {
  margin-right: 5px; /* Add space between buttons */
}

.action-buttons {
  display: flex;
}
</style>
