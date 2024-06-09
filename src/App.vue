<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Resume Builder</v-toolbar-title>
      <v-spacer></v-spacer>
      <Navbar />
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style>
</style>
