<template>
    <div class="max-w-md mx-auto p-6 m-auto bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
        <form @submit.prevent="login">
            <div class="mb-4">
                <label for="staff_code" class="block text-sm font-medium text-gray-700">Staff Code</label>
                <input type="text" id="staff_code" v-model="data.staff_code" required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div class="mb-4">
                <label for="staff_name" class="block text-sm font-medium text-gray-700">Staff Name</label>
                <input type="text" id="staff_name" v-model="data.staff_name" required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" v-model="data.password" required
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <div class="mb-4">
                <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
                <input type="datetime-local" id="date" v-model="data.date" disabled
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md" />
            </div>
            <button type="submit"
                class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Login</button>
        </form>
    </div>
</template>

<script setup>
import { inject, reactive } from 'vue'
import { useAuthStore } from '../stores/auth'
import router from '@/router';

const globalFunction = inject('globalFunctions')

const data = reactive({
    staff_code: '',
    staff_name: '',
    password: '',
    date: globalFunction.getDatetimeToday(),
})

const login = async () => {
    const authStore = useAuthStore()

    await authStore.login(data.staff_code, data.staff_name, data.password, data.date)
    router.push({ name: 'dashboard' })
}
</script>
