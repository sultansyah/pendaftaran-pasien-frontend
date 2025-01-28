<template>
    <div>
        <h1>Doctor List</h1>
        <DataTable :data="doctorData" :columns="columns" />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useDoctorStore } from '@/stores/doctor';
import DataTable from '@/components/DataTable.vue'; // Impor komponen DataTable

const doctorStore = useDoctorStore();
const doctorData = reactive(doctorStore.$state.doctors);

const columns = reactive([
    { label: 'Doctor ID', field: 'doctor_id', sortable: true, filterable: true },
    { label: 'Doctor Name', field: 'doctor_name', sortable: true, filterable: true },
    { label: 'Spesialisasi', field: 'specialization', sortable: true, filterable: true },
    { label: 'Hari Bekerja', field: 'days', sortable: true, filterable: true },
    { label: 'Jam Mulai Bekerja', field: 'start_time', sortable: true, filterable: true },
    { label: 'Jam Selesai Bekerja', field: 'end_time', sortable: true, filterable: true },
    { label: 'Clinic ID', field: 'clinic_id', sortable: true, filterable: true },
    { label: 'Clinic Name', field: 'clinic_name', sortable: true, filterable: true },
    { label: 'Created At', field: 'created_at', sortable: true, filterable: true },
    { label: 'Updated At', field: 'updated_at', sortable: true, filterable: true },
]);

onMounted(async () => {
    await doctorStore.get()
    console.log(doctorStore.$state.doctors);
    doctorData.values = doctorStore.$state.doctors
    
})
</script>