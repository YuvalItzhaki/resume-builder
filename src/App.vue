<!-- src/App.vue -->
<script>
export default {
  name: 'App',
};
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Resume Builder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Dashboard</v-btn>
      <v-btn text to="/login">Login</v-btn>
      <v-btn text to="/register">Register</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
</style>
