<template>
    <div class="min-h-screen bg-gray-100 p-4 print:p-0 print:bg-white">
        <!-- Tombol Cetak -->
        <div class="max-w-lg mx-auto mb-2 text-right print:hidden">
            <button @click="printQueue"
                class="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span class="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                            clip-rule="evenodd" />
                    </svg>
                    Cetak
                </span>
            </button>
        </div>

        <div class="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none">
            <!-- Header -->
            <div class="bg-blue-600 p-4 text-white text-center print:bg-white print:text-black">
                <h1 class="text-xl font-bold mb-1">RUMAH SAKIT UMUM</h1>
                <p class="text-xs">Jl...</p>
            </div>

            <!-- Queue Number -->
            <div class="py-4 px-6 text-center border-b">
                <div class="text-base text-gray-600 mb-1">Nomor Antrian</div>
                <div class="text-5xl font-bold text-blue-600 mb-2">{{ registerData.queue?.queue_number }}</div>
                <div class="text-lg font-semibold text-gray-800">{{ registerData.department }}</div>
            </div>

            <!-- Patient Details -->
            <div class="p-4 space-y-3">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <p class="text-gray-600 text-xs">No. Registrasi</p>
                        <p class="font-semibold text-sm">{{ registerData.register_id }}</p>
                    </div>
                    <div>
                        <p class="text-gray-600 text-xs">No. Rekam Medis</p>
                        <p class="font-semibold text-sm">{{ registerData.medical_record_no }}</p>
                    </div>
                </div>

                <div>
                    <p class="text-gray-600 text-xs">Jenis Pemeriksaan</p>
                    <p class="font-semibold text-sm">{{ registerData.medical_procedure }}</p>
                </div>

                <div>
                    <p class="text-gray-600 text-xs">Total Pembayaran</p>
                    <p class="font-semibold text-sm">Rp {{ formatCurrency(registerData.transaction?.total_payment) }}
                    </p>
                </div>

                <div>
                    <p class="text-gray-600 text-xs">Status Pembayaran</p>
                    <span :class="`px-2 py-0.5 rounded-full text-xs ${registerData.transaction?.payment_status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`">
                        {{ registerData.transaction?.payment_status }}
                    </span>
                </div>

                <div>
                    <p class="text-gray-600 text-xs">Tanggal</p>
                    <p class="font-semibold text-sm">{{ formatDate(registerData.created_at) }}</p>
                </div>
            </div>

            <!-- Footer -->
            <div class="py-3 px-4 bg-gray-50 text-center text-xs text-gray-600 print:bg-white">
                <p>Silakan tunggu nomor antrian Anda dipanggil</p>
                <p class="mt-0.5">Terima kasih atas kesabaran Anda</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRegisterStore } from "@/stores/register"

const route = useRoute()
const registerStore = useRegisterStore()
const registerData = ref({})

const formatDate = (dateString) => {
    try {
        if (!dateString || dateString === "0001-01-01T00:00:00Z") {
            return "-"
        }

        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
            return "-"
        }

        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date)
    } catch (error) {
        console.error('Error formatting date:', error)
        return "-"
    }
}

const formatCurrency = (value) => {
    try {
        if (!value || isNaN(value)) {
            return "0"
        }
        return value.toLocaleString('id-ID')
    } catch (error) {
        console.error('Error formatting currency:', error)
        return "0"
    }
}

const printQueue = () => {
    window.print()
}

onMounted(async () => {
    await registerStore.getByRegisterId(route.params.registerId)
    registerData.value = registerStore.$state.register
})
</script>

<style scoped>
@media print {
    @page {
        size: A5;
        margin: 0;
    }

    body {
        margin: 0.5cm;
    }
}
</style>