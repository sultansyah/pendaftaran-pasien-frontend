<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">Data Dokter</h1>
        <button class="mb-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" @click="toggleForm">
            {{ showForm ? "Sembunyikan" : "Form Data Dokter" }}
        </button>

        <Form v-if="showForm" @submit="handleFormSubmit" :form="form" :polyclinicData="polyclinicData"
            :toggleEdit="toggleEdit" />

        <DataTable :data="doctorData" :columns="columns" @edit="prepareEditForm" @delete="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDoctorStore } from "@/stores/doctor";
import { usePolyclinicStore } from "@/stores/polyclinic";
import Swal from "sweetalert2";
import DataTable from "@/components/DataTable.vue";
import Form from "@/components/doctor/Form.vue";

const showForm = ref(false);
const toggleEdit = ref(false);

const doctorStore = useDoctorStore();
const polyclinicStore = usePolyclinicStore();

const doctorData = ref([]);
const polyclinicData = ref([]);
const form = ref({
    doctor_id: "",
    clinic_id: "",
    doctor_name: "",
    specialization: "",
    days: "",
    start_time: "",
    end_time: "",
    phone_number: "",
});

const columns = [
    { label: "Doctor ID", field: "doctor_id", sortable: true, filterable: true },
    { label: "Doctor Name", field: "doctor_name", sortable: true, filterable: true },
    { label: "Clinic Name", field: "clinic_name", sortable: true, filterable: true },
    { label: "Spesialisasi", field: "specialization", sortable: true, filterable: true },
    { label: "Hari Bekerja", field: "days", sortable: true, filterable: true },
    { label: "Jam Mulai", field: "start_time", sortable: true, filterable: true },
    { label: "Jam Selesai", field: "end_time", sortable: true, filterable: true },
    { label: "Actions", field: "actions", sortable: false, filterable: false },
];

onMounted(async () => {
    await fetchDoctors();
    await fetchPolyclinics();
});

const toggleForm = () => {
    showForm.value = !showForm.value;
    if (!showForm.value) resetForm();
};

const fetchDoctors = async () => {
    await doctorStore.get();
    doctorData.value = doctorStore.$state.doctors || [];
};

const fetchPolyclinics = async () => {
    await polyclinicStore.get();
    polyclinicData.value = polyclinicStore.$state.polyclinics || [];
};

const resetForm = () => {
    form.value = {
        doctor_id: "",
        clinic_id: "",
        doctor_name: "",
        specialization: "",
        days: "",
        start_time: "",
        end_time: "",
        phone_number: "",
    };
    toggleEdit.value = false;
};

const handleFormSubmit = async (action) => {
    if (action === "add") {
        await doctorStore.add(form.value);
    } else if (action === "edit") {
        await doctorStore.edit(form.value);
    }
    resetForm();
    showForm.value = false;
    fetchDoctors();
};

const prepareEditForm = (doctor) => {
    form.value = { ...doctor };
    toggleEdit.value = true;
    showForm.value = true;
};

const confirmDelete = async (doctor) => {
    const result = await Swal.fire({
        title: `Hapus data ${doctor.doctor_name}?`,
        showDenyButton: true,
        confirmButtonText: "Hapus",
        denyButtonText: "Batal",
    });
    if (result.isConfirmed) {
        await doctorStore.remove(doctor.doctor_id);
        fetchDoctors();
    }
};
</script>