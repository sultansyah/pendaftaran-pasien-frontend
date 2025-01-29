<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Header v-if="!route.meta.layout" />
    <div class="flex flex-1">
      <!-- Sidebar -->
      <Sidebar v-if="authStore.isAuthenticated && !route.meta.layout" />
      <!-- Content -->
      <div class="flex-1 p-4 overflow-x-auto">
        <RouterView />
      </div>
    </div>
    <Footer v-if="!route.meta.layout" />
  </div>
</template>


<script setup>
import { RouterView, useRoute } from 'vue-router'

import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'
import Sidebar from './components/layouts/Sidebar.vue'
import { useAuthStore } from './stores/auth';

const route = useRoute()

const authStore = useAuthStore()
</script>