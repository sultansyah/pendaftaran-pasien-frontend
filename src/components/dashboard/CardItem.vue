<template>
    <div class="bg-white rounded-2xl shadow-md p-8 flex items-center space-x-4">
        <div class="p-3 bg-blue-100 text-blue-600 rounded-full">
            <!-- Ikon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a7 7 0 100 14h2a7 7 0 000-14H9z" />
            </svg>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-500">{{ title }}</p>
            <h2 class="text-2xl font-bold text-gray-800">{{ total }}</h2>
        </div>
    </div>
</template>

<script setup>
    defineProps({
        title: {
            type: String,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        }
    })
</script>