<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-white font-semibold mr-6">Home</router-link>
        <router-link to="/register" class="text-white">Register</router-link>
        <router-link to="/login" class="text-white">Login</router-link>
        <router-link to="/userdash" class="text-white">User Dashboard</router-link>
        <router-link to="/artist" class="text-white">Artist</router-link>
      </div>

      <button v-if="store.token" class="text-white" @click="logout">Logout</button>
    </div>
  </nav>
</template>



<script setup>
import { userDataStore } from '~/store/userData';

const store = userDataStore();

const logout = async () => {
  await useApi('logout');
  store.token = null;
  this.$router.push('/');
};
</script>
