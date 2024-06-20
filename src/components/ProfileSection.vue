<template>
  <div class="profile-section">
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.title }}</p>
  </div>
  <div>
    <button @click="editProfile">Edit</button>

    <!-- Modal -->
    <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Profile</h2>
        <p>
          <label for="modal-profile-name" style="color: black;">
            Name:
            <input id="modal-profile-name" v-model="profile.name" />
          </label>
        </p>
        <p>
          <label for="modal-profile-title" style="color: black;">
            Title:
            <input id="modal-profile-title" v-model="profile.title" />
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
import { useProfileStore } from '../stores/profileStore';

const showModal = ref(false);
const profileStore = useProfileStore();
const profile = ref({ ...profileStore.profile });

onMounted(() => {
  profileStore.fetchProfile();
  watch(() => profileStore.profile, (newProfile) => {
    profile.value = { ...newProfile };
  });
});

const editProfile = () => {
  showModal.value = true;
};

const saveEdit = async () => {
  profileStore.setProfile(profile.value);
  await profileStore.saveProfile();
  showModal.value = false;
};

const cancelEdit = () => {
  profile.value = { ...profileStore.profile };
  showModal.value = false;
};
</script>

<style scoped>
.profile-section {
  text-align: left;
  height: 200px;
  background-color: #073763;
  position: relative;
  padding: 20px;
}
.profile-section::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid white;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}
.profile-pic {
  width: 100%;
  border-radius: 50%;
}
h1 {
  font-size: 34px;
  font-family: 'Times New Roman', Times, serif;
  color: white;
  margin: 10px 0;
}
p {
  font-size: 18px;
  color: white;
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
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
