<template>
    Dashboard
    <!-- card -->
    <div class="flex flex-wrap mt-2">
        <CardItem class="m-3 w-68" v-for="item in data" v-bind:key="item.title" :title="item.title" :total="item.total" />
    </div>
</template>

<script setup>
import CardItem from '@/components/dashboard/CardItem.vue';

import { useDoctorStore } from '@/stores/doctor';
import { usePatientStore } from '@/stores/patient';
import { usePolyclinicStore } from '@/stores/polyclinic';
import { useQueueStore } from '@/stores/queue';
import { inject, onMounted, reactive } from 'vue';

const globalFunctions = inject('globalFunctions')

const polyclinicStore = usePolyclinicStore()
const doctorStore = useDoctorStore()
const patientStore = usePatientStore()
const queueStore = useQueueStore()

const data = reactive({
    queue: {
        title: "Jumlah Antrian Hari Ini",
        total: 0,
    },
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
    await queueStore.get(`date=${globalFunctions.getDateToday()}`)

    data.polyclinic.total = polyclinicStore.$state.polyclinics.length
    data.doctor.total = doctorStore.$state.doctors.length
    data.patient.total = patientStore.$state.patients.length
    data.queue.total = queueStore.$state.queues?.length || 0
})
</script>