<template>
    Dashboard
    <!-- card -->
    <div class="flex flex-wrap mt-2">
        <CardItem v-for="item in data" v-bind:key="item.title" :title="item.title" :total="item.total" class="m-3" />
    </div>
</template>

<script setup>
import CardItem from '@/components/dashboard/CardItem.vue';

import { useDoctorStore } from '@/stores/doctor';
import { usePatientStore } from '@/stores/patient';
import { usePolyclinicStore } from '@/stores/polyclinic';
import { onMounted, reactive } from 'vue';

const polyclinicStore = usePolyclinicStore()
const doctorStore = useDoctorStore()
const patientStore = usePatientStore()

const data = reactive({
    polyclinic: {
        title: "Jumlah Poliklinik",
        total: 0,
    },
    doctor: {
        title: "Jumlah Doktor",
        total: 0,
    },
    patient: {
        title: "Jumlah Pasien",
        total: 0,
    },
})

onMounted(async () => {
    await polyclinicStore.get()
    await doctorStore.get()
    await patientStore.get()

    data.polyclinic.total = polyclinicStore.$state.polyclinics.length
    data.doctor.total = doctorStore.$state.doctors.length
    data.patient.total = patientStore.$state.patients.length
})
</script>