<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">Data Poliklinik</h1>
        <button class="mb-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" @click="toggleForm">
            {{ showForm ? "Sembunyikan" : "Form Data Poliklinik" }}
        </button>

        <Form v-if="showForm" @submit="handleFormSubmit" :form="form" :polyclinicData="polyclinicData"
            :toggleEdit="toggleEdit" />

        <DataTable :data="polyclinicData" :columns="columns" @edit="prepareEditForm" @delete="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePolyclinicStore } from "@/stores/polyclinic";
import Swal from "sweetalert2";
import DataTable from "@/components/DataTable.vue";
import Form from "@/components/polyclinic/Form.vue";

const showForm = ref(false);
const toggleEdit = ref(false);

const polyclinicStore = usePolyclinicStore();
const polyclinicData = ref([]);

const form = ref({
    clinic_id: "",
    clinic_name: "",
    location: "",
});

const columns = [
    { label: "Clinic ID", field: "clinic_id", sortable: true, filterable: true },
    { label: "Clinic Name", field: "clinic_name", sortable: true, filterable: true },
    { label: "Lokasi", field: "location", sortable: true, filterable: true },
    { label: "Actions", field: "actions", sortable: false, filterable: false },
];

onMounted(async () => {
    await fetchPolyclinics();
});

const toggleForm = () => {
    showForm.value = !showForm.value;
    if (!showForm.value) resetForm();
};

const fetchPolyclinics = async () => {
    await polyclinicStore.get();
    polyclinicData.value = polyclinicStore.$state.polyclinics;
};

const resetForm = () => {
    form.value = {
        clinic_id: "",
        clinic_name: "",
        location: "",
    };
    toggleEdit.value = false;
};

const handleFormSubmit = async (action) => {
    if (action === "add") {
        await polyclinicStore.add(form.value);
    } else if (action === "edit") {
        await polyclinicStore.edit(form.value);
    }
    resetForm();
    showForm.value = false;
    fetchPolyclinics();
};

const prepareEditForm = (polyclinic) => {
    form.value = { ...polyclinic };
    toggleEdit.value = true;
    showForm.value = true;
};

const confirmDelete = async (polyclinic) => {
    const result = await Swal.fire({
        title: `Hapus data ${polyclinic.clinic_name}?`,
        showDenyButton: true,
        confirmButtonText: "Hapus",
        denyButtonText: "Batal",
    });
    if (result.isConfirmed) {
        await polyclinicStore.remove(polyclinic.clinic_id);
        fetchPolyclinics();
    }
};
</script>