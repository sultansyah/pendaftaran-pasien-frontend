<template>
    <div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 class="text-2xl font-semibold text-gray-700 mb-6">Data Antrian</h1>
        
        <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-600">Tanggal</label>
            <input 
                v-model="date" 
                id="date" 
                type="date" 
                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                @change="filterDate" 
            />
        </div>
        
        <DataTable :data="filteredQueues" :columns="columns" @completed="confirmCompleted" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from "vue";
import { useQueueStore } from "@/stores/queue";
import DataTable from "@/components/DataTable.vue";
import Swal from "sweetalert2";

const globalFunctions = inject('globalFunctions')

// const date = ref(globalFunctions.getDateToday());
const date = ref('');
const toggleEdit = ref(false);
const queueStore = useQueueStore();
const queues = ref([]);

const form = ref({
    queue_id: "",
    register_id: "",
    queue_number: 0,
    created_at: "",
    updated_at: ""
});

const columns = [
    { label: "ID Antrian", field: "queue_id", sortable: true },
    { label: "ID Registrasi", field: "register_id", sortable: true },
    { label: "Nomor Antrian", field: "queue_number", sortable: true },
    { label: "Selesai", field: "is_completed", sortable: true },
    { label: "Tanggal Dibuat", field: "created_at", sortable: true },
    { label: "Tanggal Diperbarui", field: "updated_at", sortable: true },
    { label: "Actions", field: "actions-queue", sortable: false }
];

const confirmCompleted = async (queue) => {
    console.log("hehe");
    
    const result = await Swal.fire({
        title: `Selesaikan antrian ${queue.queue_number}?`,
        showDenyButton: true,
        confirmButtonText: "Selesai",
        denyButtonText: "Batal",
    });
    if (result.isConfirmed) {
        await queueStore.setCompleted(queue)
        await fetchQueues()
    }
}

const filteredQueues = computed(() => {
    if (!date.value) {
        return queues.value;
    }

    return queues.value.filter(item => {
        const createdAt = formattedDate(item.created_at);
        return createdAt === date.value;
    });
});

onMounted(async () => {
    await fetchQueues();
});

const fetchQueues = async () => {
    await queueStore.get();
    queues.value = queueStore.$state.queues.map(item => {
        if (item.created_at || item.updated_at) {
            return {
                ...item,
                created_at: item.created_at ? formattedDatetime(item.created_at) : item.created_at,
                updated_at: item.updated_at ? formattedDatetime(item.updated_at) : item.updated_at,
            };
        }
        return item;
    });
};

const formattedDatetime = (datestr) => {
    const dateF = new Date(datestr);
    return dateF.toISOString().replace('T', ' ').slice(0, 19);
}

const formattedDate = (datestr) => {
    const dateF = new Date(datestr);
    const year = dateF.getFullYear();
    const month = String(dateF.getMonth() + 1).padStart(2, '0');
    const day = String(dateF.getDate()).padStart(2, '0');

    // format YYYY-MM-DD
    return `${year}-${month}-${day}`;
}
</script>