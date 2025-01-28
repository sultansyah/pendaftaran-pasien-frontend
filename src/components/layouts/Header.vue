<template>
    <!-- Header -->
    <header class="bg-white shadow">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <a :href="(authStore.isAuthenticated) ? '/dashboard' : '/'"><h1 class="text-2xl font-bold text-gray-800">RSU Sakina Idaman</h1></a>
            <nav>
                <ul v-if="!authStore.isAuthenticated" class="flex space-x-4">
                    <li><a href="/queue" class="text-gray-600 hover:text-blue-600">Antrian</a></li>
                    <li><a href="/login" class="text-gray-600 hover:text-blue-600">Login</a></li>
                </ul>
                <ul v-else class="flex space-x-4">
                    <li>
                        <a href="#" @click.prevent="logout" class="text-gray-600 hover:text-blue-600">
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const logout = async () => {
    await authStore.logout()
    router.push({ name: 'home' })
}
</script>