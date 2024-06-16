<template>
  <div class="contact-section">
    <h2>CONTACT</h2>
    <p>
      <label for="contact-email">
        <font-awesome-icon icon="envelope" />
        <input v-model="contact.email" v-if="isEditing" />
        <a :href="'mailto:' + contact.email" v-else>{{ contact.email }}</a>
      </label>
    </p>
    <p>
      <label for="contact-phone">
        <font-awesome-icon icon="phone" />
        <input v-model="contact.phone" v-if="isEditing" />
        <span v-else>{{ contact.phone }}</span>
      </label>
    </p>
    <p>
      <label for="contact-linkedin">
        <font-awesome-icon :icon="['fab', 'linkedin']" />
        <input v-model="contact.linkedin" v-if="isEditing" />
        <a :href="contact.linkedin" target="_blank" v-else>LinkedIn</a>
      </label>
    </p>
    <p>
      <label for="contact-github">
        <font-awesome-icon :icon="['fab', 'github']" />
        <input v-model="contact.github" v-if="isEditing" />
        <a :href="contact.github" target="_blank" v-else>GitHub</a>
      </label>
    </p>
    <button @click="toggleEditMode">
      {{ isEditing ? 'Save' : 'Edit' }}
    </button>
    <button v-if="isEditing" @click="cancelEdit">Cancel</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useContactStore } from '../stores/contactStore';

const isEditing = ref(false);

const contactStore = useContactStore();

onMounted(() => {
  contactStore.fetchContact();
});

const contact = ref({ ...contactStore.contact });

watch(
  () => contactStore.contact,
  (newContact) => {
    contact.value = { ...newContact };
  },
  { deep: true }
);

const toggleEditMode = () => {
  if (isEditing.value) {
    contactStore.setContact(contact.value);
    contactStore.saveContact();
  }
  isEditing.value = !isEditing.value;
};
const cancelEdit = () => {
  contact.value = contactStore.contact;
  isEditing.value = false;
};
</script>

<style scoped>
.contact-section {
  padding: 2px;
  background-color: #f9f9f9;
  border-radius: 2px;
  font-family: 'Times New Roman', Times, serif;
}

.contact-section h2 {
  color: #073763;
  padding: 4px;
  text-align: left;
  border-radius: 2px 2px 0 0;
}

.contact-section p {
  margin: 5px 0;
}

.contact-section a {
  color: #00796b;
  text-decoration: none;
}

.contact-section a:hover {
  text-decoration: underline;
}

button {
  margin-bottom: 10px;
  background-color: #00796b;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #005f56;
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
</style>
