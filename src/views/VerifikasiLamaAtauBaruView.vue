<template>
    <div class="min-h-screen py-8 px-4">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <h1 class="text-3xl font-bold mb-6 text-gray-900 text-center">Verifikasi Pasien Baru / Lama</h1>

            <form @submit.prevent="verification" class="mb-8 max-w-lg mx-auto space-y-6">
                <div class="mb-4">
                    <label for="identityNumber" class="block text-sm font-semibold text-gray-700 mb-2">
                        No Pengenal, seperti no KTP
                    </label>
                    <input type="text" id="identityNumber" v-model="identityNumber" required
                        class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        placeholder="Masukkan no pengenal" />
                </div>

                <button type="submit"
                    class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Verifikasi
                </button>
            </form>

            <!-- Error Message -->
            <div class="max-w-lg mx-auto bg-red-50 p-6 rounded-lg shadow-lg mb-6" v-if="error">
                <div class="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v3m0 4h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 12 2s10 4.477 10 10z" />
                    </svg>
                    <p class="text-red-600 text-sm font-medium">{{ error }}</p>
                </div>
                <a href="/medical-record"
                    class="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 block mt-4 text-center">Daftarkan
                    pasien?</a>
            </div>

            <!-- Success Message -->
            <div class="max-w-lg mx-auto bg-blue-50 p-6 rounded-lg shadow-lg mb-6" v-if="medicalRecordData">
                <div class="flex items-center space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v3m0 4h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 12 2s10 4.477 10 10z" />
                    </svg>
                    <p class="text-blue-600 text-sm font-medium">Data pasien ditemukan</p>
                </div>
                <a href="/register"
                    class="py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 block mt-4 text-center">Daftarkan
                    antrian pasien?</a>
            </div>

            <!-- Patient Details -->
            <div v-if="medicalRecordData" class="bg-gray-50 p-8 rounded-xl">
                <h2 class="text-2xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200">Detail Pasien</h2>
                <div class="space-y-4">
                    <div v-for="(value, key) in medicalRecordData" :key="key"
                        class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-150 ease-in-out">
                        <div class="flex justify-between items-center">
                            <strong class="text-gray-700 font-medium">{{ formatLabel(key) }}:</strong>
                            <span class="text-gray-800">{{ formatValue(key, value) }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord';
import { ref } from 'vue';

const identityNumber = ref('');
const error = ref('');
const medicalRecordData = ref(null);

const verification = async () => {
    const medicalRecord = useMedicalRecordStore();
    await medicalRecord.get(`identity_number=${identityNumber.value}`);

    if (medicalRecord.$state.medicalRecords.length === 0) {
        error.value = "No pengenal tidak ditemukan";
        medicalRecordData.value = null;
    } else {
        medicalRecordData.value = medicalRecord.$state.medicalRecords[0];
        error.value = '';
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatLabel = (key) => {
    return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const formatValue = (key, value) => {
    if (key === 'date_of_birth') {
        return formatDate(value);
    }
    return value ?? '-';
};
</script>