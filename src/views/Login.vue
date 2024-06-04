<template>
  <div>
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/api';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await login({ email: email.value, password: password.value });
    console.log(email.value, password.value)
    console.log('Login successful', response.data);
    router.push('/'); // Redirect after successful login
  } catch (error) {
    console.error('Login failed', error.response.data);
  }
};
</script>
