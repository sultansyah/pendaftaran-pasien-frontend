<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">Data Registrasi</h1>
        <button class="mb-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" @click="toggleForm">
            {{ showForm ? "Sembunyikan" : "Form Data Registrasi" }}
        </button>

        <Form v-if="showForm" @submit="handleFormSubmit" :form="form" :polyclinicData="polyclinicData"
            :doctorData="doctorData" :registers="registerData" :toggleEdit="toggleEdit" />

        <DataTable :data="registers" :columns="columns" @edit="prepareEditForm" @delete="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRegisterStore } from "@/stores/register";
import Swal from "sweetalert2";
import DataTable from "@/components/DataTable.vue";
import Form from "@/components/registerPatient/Form.vue";
import { useRoute } from "vue-router";
import { usePolyclinicStore } from "@/stores/polyclinic";
import { useDoctorStore } from "@/stores/doctor";

const route = useRoute();

const showForm = ref(route.params.showForm || false);
const toggleEdit = ref(false);

const registerStore = useRegisterStore();
const polyclinicStore = usePolyclinicStore()
const doctorStore = useDoctorStore()

const registers = ref([]);
const polyclinicData = ref([]);
const doctorData = ref([]);

const form = ref({
    medical_record_no: route.params.medicalRecordNo || "",
    register_id: "",
    session_polyclinic: "",
    clinic_id: "",
    doctor_id: "",
    department: "",
    class: "",
    entry_method: "",
    admission_fee: "",
    medical_procedure: "",
    registration_fee: "",
    examination_fee: "",
    total_fee: "",
    transaction_id: "",
    discount: "",
    total_payment: "",
    payment_type: "",
    payment_status: "",
    queue_id: "",
    queue_number: "",
    is_completed: "",
    created_at: "",
    updated_at: ""
});

const columns = [
    { label: "Register ID", field: "register_id", sortable: true, filterable: true },
    { label: "No Rekam Medis", field: "medical_record_no", sortable: true, filterable: true },
    { label: "Sesi Poliklinik", field: "session_polyclinic", sortable: true, filterable: true },
    { label: "Instalasi", field: "department", sortable: true, filterable: true },
    { label: "Kelas", field: "class", sortable: true, filterable: true },
    { label: "Cara Masuk", field: "entry_method", sortable: true, filterable: true },
    { label: "Tarif Masuk", field: "admission_fee", sortable: true, filterable: true },
    { label: "Tindakan", field: "medical_procedure", sortable: true, filterable: true },
    { label: "Biaya Pendaftaran", field: "registration_fee", sortable: true },
    { label: "Biaya Pemeriksaan", field: "examination_fee", sortable: true },
    { label: "Total Biaya", field: "total_fee", sortable: true },
    { label: "Diskon", field: "discount", sortable: true },
    { label: "Total Pembayaran", field: "total_payment", sortable: true },
    { label: "Jenis Pembayaran", field: "payment_type", sortable: true },
    { label: "Status Pembayaran", field: "payment_status", sortable: true },
    { label: "No Antrian", field: "queue_number", sortable: true },
    { label: "Selesai?", field: "is_completed", sortable: true },
    { label: "Actions", field: "actions", sortable: false, filterable: false }
];

onMounted(async () => {
    await fetchRegisters();
    await fetchPolyclinics();
    await fetchDoctors();
});

const toggleForm = () => {
    showForm.value = !showForm.value;
};

const fetchRegisters = async () => {
    await registerStore.get();
    registers.value = registerStore.$state.registers.map(item => {
        const flattenedItem = {
            ...item,
            registration_fee: item.transaction?.registration_fee,
            examination_fee: item.transaction?.examination_fee,
            total_fee: item.transaction?.total_fee,
            discount: item.transaction?.discount,
            total_payment: item.transaction?.total_payment,
            payment_type: item.transaction?.payment_type,
            payment_status: item.transaction?.payment_status,
            transaction_id: item.transaction?.transaction_id,
            queue_id: item.queue?.queue_id,
            queue_number: item.queue?.queue_number,
            is_completed: item.queue?.is_completed,
            created_at: item.created_at ? formattedDatetime(item.created_at) : item.created_at,
            updated_at: item.updated_at ? formattedDatetime(item.updated_at) : item.updated_at,
        };
        return flattenedItem;
    });
};

const fetchPolyclinics = async () => {
    await polyclinicStore.get();
    polyclinicData.value = polyclinicStore.$state.polyclinics || [];
};


const fetchDoctors = async () => {
    await doctorStore.get();
    doctorData.value = doctorStore.$state.doctors || [];
};

const resetForm = () => {
    form.value = {
        medical_record_no: "",
        register_id: "",
        session_polyclinic: "",
        clinic_id: "",
        doctor_id: "",
        department: "",
        class: "",
        entry_method: "",
        admission_fee: "",
        medical_procedure: "",
        registration_fee: "",
        examination_fee: "",
        total_fee: "",
        transaction_id: "",
        discount: "",
        total_payment: "",
        payment_type: "",
        payment_status: "",
        queue_id: "",
        queue_number: "",
        is_completed: "",
        created_at: "",
        updated_at: ""
    };
    toggleEdit.value = false;
};

const handleFormSubmit = async (action) => {
    if (action === "add") {
        await registerStore.add(form.value);
    } else if (action === "edit") {
        await registerStore.edit(form.value);
    }

    if (!registerStore.$state.isError) {
        resetForm();
        showForm.value = false;
        fetchRegisters();
    }
};

const prepareEditForm = (register) => {
    form.value = { ...register };
    toggleEdit.value = true;
    showForm.value = true;
};

const confirmDelete = async (register) => {
    const result = await Swal.fire({
        title: `Hapus data ${register.register_id}?`,
        showDenyButton: true,
        confirmButtonText: "Hapus",
        denyButtonText: "Batal",
    });
    if (result.isConfirmed) {
        await registerStore.remove(register.register_id);
        fetchRegisters();
    }
};

const formattedDatetime = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
}
</script>