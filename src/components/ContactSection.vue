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
    <!-- <button @click="editContact">Edit</button> -->

    <!-- Modal -->
    <!-- <div v-if="showModal" class="edit-modal">
      <div class="modal-content">
        <h2>Edit Contact</h2>
        <p>
          <label for="modal-contact-email">
            Email:
            <input id="modal-contact-email" v-model="contact.email" />
          </label>
        </p>
        <p>
          <label for="modal-contact-phone">
            Phone:
            <input id="modal-contact-phone" v-model="contact.phone" />
          </label>
        </p>
        <p>
          <label for="modal-contact-linkedin">
            LinkedIn:
            <input id="modal-contact-linkedin" v-model="contact.linkedin" />
          </label>
        </p>
        <p>
          <label for="modal-contact-github">
            GitHub:
            <input id="modal-contact-github" v-model="contact.github" />
          </label>
        </p>
        <button @click="saveEdit">Save </button>
        <button @click="cancelEdit">Cancel </button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useContactStore } from '../stores/contactStore';
import { useRoute } from 'vue-router';

const isEditing = ref(false);
const showModal = ref(false);
const route = useRoute();
const id = route.params.id;
const contactStore = useContactStore();


const contact = ref({ ...contactStore.contact });

onMounted(() => {
  contactStore.fetchContact(id);
});

watch(
  () => contactStore.contact,
  (newContact) => {
    contact.value = { ...newContact };
  },
  { deep: true }
);

// const editContact = () => {
//   showModal.value = true;
//   isEditing.value = true;
// };

// const saveEdit = () => {
//   contactStore.setContact(contact.value);
//   contactStore.saveContact(id);
//   showModal.value = false;
//   isEditing.value = false;
// };

// const cancelEdit = () => {
//   contact.value = { ...contactStore.contact };
//   showModal.value = false;
//   isEditing.value = false;
// };
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
  font-family: 'Times New Roman', Times, serif;
  margin-bottom: 10px;
  color: black;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 4px;
}

button:hover {
  background-color: #6c99e1;
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
