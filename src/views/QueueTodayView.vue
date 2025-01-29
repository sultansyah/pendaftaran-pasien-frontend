<template>
    <div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 class="text-2xl font-semibold text-gray-700 mb-6">Antrian Hari Ini</h1>
        <div class="mb-6 text-center">
            <h2 class="text-xl font-semibold text-gray-600">Nomor Antrian Saat Ini</h2>
            <div v-if="currentQueue" class="text-4xl font-bold text-blue-600 mt-2">{{ currentQueue.queue_number }}</div>
            <div v-else class="text-gray-500">Tidak ada antrian aktif</div>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border border-gray-300 px-4 py-2">No</th>
                        <th class="border border-gray-300 px-4 py-2">Register ID</th>
                        <th class="border border-gray-300 px-4 py-2">Nomor Antrian</th>
                        <th class="border border-gray-300 px-4 py-2">Status</th>
                        <th class="border border-gray-300 px-4 py-2">Dibuat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(queue, index) in filteredQueues" :key="queue.queue_id" class="text-center">
                        <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
                        <td class="border border-gray-300 px-4 py-2">{{ queue.register_id }}</td>
                        <td class="border border-gray-300 px-4 py-2 text-lg font-bold">{{ queue.queue_number }}</td>
                        <td class="border border-gray-300 px-4 py-2">
                            <span :class="queue.is_completed ? 'text-green-600' : 'text-red-600'">
                                {{ queue.is_completed ? 'Selesai' : 'Menunggu' }}
                            </span>
                        </td>
                        <td class="border border-gray-300 px-4 py-2">{{ formattedDatetime(queue.created_at) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, inject } from "vue";
import { useQueueStore } from "@/stores/queue";

const globalFunctions = inject('globalFunctions');
const date = globalFunctions.getDateToday();
const queueStore = useQueueStore();
const queues = ref([]);
let intervalId = null;

const fetchQueues = async () => {
    await queueStore.get(`date=${date}`);
    queues.value = queueStore.$state.queues || [];
};

onMounted(async () => {
    await fetchQueues();

    // set interval untuk fetch data setiap 1 menit (60000ms)
    intervalId = setInterval(fetchQueues, 60000);
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

const formattedDatetime = (datestr) => {
    const dateF = new Date(datestr);
    return dateF.toLocaleString();
};

const filteredQueues = computed(() => {
    return Array.isArray(queues.value) ? queues.value.filter(queue => queue.created_at.startsWith(date)) : [];
});

const currentQueue = computed(() => {
    return filteredQueues.value.length > 0 ? filteredQueues.value.find(queue => !queue.is_completed) || null : null;
});
</script>
