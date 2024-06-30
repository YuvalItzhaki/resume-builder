<template>
  <div class="summary-section">
    <h2>SUMMARY</h2>
    <p>{{ summary }}</p>
    <button @click="editSummary">Edit</button>

    <!-- Modal -->
    <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Summary</h2>
        <p>
          <label for="modal-summary" style="color: black;">
            Summary content:
            <textarea id="modal-summary" v-model="localSummary" rows="5" cols="50"></textarea>
          </label>
        </p>
        <button @click="saveEdit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useSummaryStore } from '../stores/summaryStore';
import { useRoute } from 'vue-router';


const showModal = ref(false);
const localSummary = ref('');
const summaryStore = useSummaryStore();
const route = useRoute();
const id = route.params.id;
const summary = ref(summaryStore.summary);

onMounted(async () => {
  await summaryStore.fetchSummary(id);
  // summary.value = summaryStore.summary;
  // localSummary.value = summaryStore.summary;
});

watch(() => summaryStore.summary, (newSummary) => {
  summary.value = newSummary;
  localSummary.value = newSummary;
});

const editSummary = () => {
  localSummary.value = summary.value;
  showModal.value = true;
};

const saveEdit = async () => {
  summaryStore.summary = localSummary.value;
  await summaryStore.saveSummary();
  summary.value = summaryStore.summary;
  showModal.value = false;
};

const cancelEdit = () => {
  localSummary.value = summaryStore.summary;
  showModal.value = false;
};
</script>

<style scoped>
.summary-section {
  margin-bottom: 20px;
  font-family: 'Times New Roman', Times, serif;
}
h1 {
  font-size: 34px;
  font-family: 'Times New Roman', Times, serif;
  color: white;
  margin: 10px 0;
}
p {
  font-size: 18px;
  color: black;
  font-family: 'Times New Roman', Times, serif;
}
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  font-family: 'Times New Roman', Times, serif;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  font-family: 'Times New Roman', Times, serif;
}
button {
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 10px;
  color: black;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  margin-right: 20px;
  border-radius: 4px;
}
button:hover {
  background-color: #6c99e1;
}
</style>
