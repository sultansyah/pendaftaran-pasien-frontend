<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">Data Rekam Medis</h1>
        <button class="mb-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" @click="toggleForm">
            {{ showForm ? "Sembunyikan" : "Form Data Rekam Medis" }}
        </button>

        <Form v-if="showForm" @submit="handleFormSubmit" :form="form" :medicalRecords="medicalRecords"
            :toggleEdit="toggleEdit" />

        <DataTable :data="medicalRecords" :columns="columns" @edit="prepareEditForm" @delete="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMedicalRecordStore } from "@/stores/medicalRecord";
import Swal from "sweetalert2";
import DataTable from "@/components/DataTable.vue";
import Form from "@/components/medicalRecord/Form.vue";

const showForm = ref(false);
const toggleEdit = ref(false);

const medicalRecordStore = useMedicalRecordStore();
const medicalRecords = ref([]);

const form = ref({
    medical_record_no: "",
    patient_name: "",
    gender: "",
    place_of_birth: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    identity_type: "",
    identity_number: "",
    city: "",
    postal_code: "",
    medical_record_date: "",
    birth_weight: null,
    ethnicity: "",
    subdistrict: "",
    district: "",
    regency: "",
    province: "",
    citizenship: "",
    country: "",
    language: "",
    blood_type: "",
    kk_number: "",
    marital_status: "",
    religion: "",
    occupation: "",
    education: "",
    npwp: "",
    file_location: "",
    relative_name: "",
    relative_relationship: "",
    relative_phone: "",
    relative_identity_number: "",
    relative_occupation: "",
    relative_address: "",
    relative_city: "",
    relative_postal_code: "",
    mother_medical_record_no: null
});

const columns = [
    { label: "Medical Record No", field: "medical_record_no", sortable: true, filterable: true },
    { label: "Nama Pasien", field: "patient_name", sortable: true, filterable: true },
    { label: "Jenis Kelamin", field: "gender", sortable: true, filterable: true },
    { label: "Tanggal Lahir", field: "date_of_birth", sortable: true, filterable: true },
    { label: "Alamat", field: "address", sortable: true, filterable: true },
    { label: "No. Telepon", field: "phone_number", sortable: true, filterable: true },
    { label: "Tipe Indentitas", field: "identity_type", sortable: true, filterable: true },
    { label: "No Indentitas", field: "identity_number", sortable: true, filterable: true },
    { label: "Tanggal Disimpan", field: "medical_record_date", sortable: true, filterable: true },
    { label: "Actions", field: "actions", sortable: false, filterable: false }
];

onMounted(async () => {
    await fetchMedicalRecords();
});

const toggleForm = () => {
    showForm.value = !showForm.value;
    if (!showForm.value) resetForm();
};

const fetchMedicalRecords = async () => {
    await medicalRecordStore.get();
    medicalRecords.value = medicalRecordStore.$state.medicalRecords.map(item => {
        if (item.medical_record_date || item.date_of_birth) {
            return {
                ...item,
                medical_record_date: item.medical_record_date ? formattedDatetime(item.medical_record_date) : item.medical_record_date,
                date_of_birth: item.date_of_birth ? formattedDate(item.date_of_birth) : item.date_of_birth,
            };
        }
        return item;
    });
};

const resetForm = () => {
    form.value = {
        medical_record_no: "",
        patient_name: "",
        gender: "",
        place_of_birth: "",
        date_of_birth: "",
        address: "",
        phone_number: "",
        identity_type: "",
        identity_number: "",
        city: "",
        postal_code: "",
        medical_record_date: "",
        birth_weight: null,
        ethnicity: "",
        subdistrict: "",
        district: "",
        regency: "",
        province: "",
        citizenship: "",
        country: "",
        language: "",
        blood_type: "",
        kk_number: "",
        marital_status: "",
        religion: "",
        occupation: "",
        education: "",
        npwp: "",
        file_location: "",
        relative_name: "",
        relative_relationship: "",
        relative_phone: "",
        relative_identity_number: "",
        relative_occupation: "",
        relative_address: "",
        relative_city: "",
        relative_postal_code: "",
        mother_medical_record_no: null
    };
    toggleEdit.value = false;
};

const handleFormSubmit = async (action) => {
    if (action === "add") {
        await medicalRecordStore.add(form.value);
    } else if (action === "edit") {
        await medicalRecordStore.edit(form.value);
    }
    
    if (!medicalRecordStore.$state.isError) {
        resetForm();
        showForm.value = false;
        fetchMedicalRecords();
    }
};

const prepareEditForm = (medicalRecord) => {
    form.value = { ...medicalRecord };
    toggleEdit.value = true;
    showForm.value = true;
};

const confirmDelete = async (medicalRecord) => {
    const result = await Swal.fire({
        title: `Hapus data ${medicalRecord.medical_record_no}?`,
        showDenyButton: true,
        confirmButtonText: "Hapus",
        denyButtonText: "Batal",
    });
    if (result.isConfirmed) {
        await medicalRecordStore.remove(medicalRecord.medical_record_no);
        fetchMedicalRecords();
    }
};

const formattedDate = (date) => {
    // format YYYY-MM-DD
    return date ? date.split('T')[0] : '';
}

const formattedDatetime = (date) => {
    // mengubah format rawDatetime menjadi format yang dibutuhkan untuk datetime-local
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16); // ambil bagian tahun-bulan-hari jam-menit
}
</script>
