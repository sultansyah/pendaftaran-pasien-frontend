<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header />
    <div class="flex flex-1">
      <!-- Sidebar -->
      <Sidebar v-if="authStore.isAuthenticated" />
      <!-- Content -->
      <div class="flex-1 p-4 overflow-x-auto">
        <RouterView />
      </div>
    </div>
    <Footer />
  </div>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'
import Sidebar from './components/layouts/Sidebar.vue'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore()
</script>