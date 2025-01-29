<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">Data Transaksi</h1>
        <button class="mb-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600" @click="toggleForm" v-if="showForm">
            Sembunyikan
        </button>

        <Form v-if="showForm" @submit="handleFormSubmit" :form="form" :toggleEdit="toggleEdit" />

        <DataTable :data="transactions" :columns="columns" @edit="prepareEditForm" @delete="confirmDelete" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTransactionStore } from "@/stores/transaction";
import Swal from "sweetalert2";
import DataTable from "@/components/DataTable.vue";
import Form from "@/components/transaction/Form.vue";

const showForm = ref(false);
const toggleEdit = ref(false);

const transactionStore = useTransactionStore();
const transactions = ref([]);

const form = ref({
    transaction_id: "",
    register_id: "",
    registration_fee: 0,
    examination_fee: 0,
    total_fee: 0,
    discount: 0,
    total_payment: 0,
    payment_type: "",
    payment_status: "",
    created_at: "",
    updated_at: ""
});

const columns = [
    { label: "ID Transaksi", field: "transaction_id", sortable: true },
    { label: "ID Registrasi", field: "register_id", sortable: true },
    { label: "Biaya Pendaftaran", field: "registration_fee", sortable: true },
    { label: "Biaya Pemeriksaan", field: "examination_fee", sortable: true },
    { label: "Total Biaya", field: "total_fee", sortable: true },
    { label: "Diskon", field: "discount", sortable: true },
    { label: "Total Pembayaran", field: "total_payment", sortable: true },
    { label: "Jenis Pembayaran", field: "payment_type", sortable: true },
    { label: "Status Pembayaran", field: "payment_status", sortable: true },
    { label: "Tanggal Dibuat", field: "created_at", sortable: true },
    { label: "Tanggal Diperbarui", field: "updated_at", sortable: true },
    { label: "Actions", field: "actions", sortable: false }
];

onMounted(async () => {
    await fetchTransactions();
});

const toggleForm = () => {
    showForm.value = !showForm.value;
    if (!showForm.value) resetForm();
};

const fetchTransactions = async () => {
    await transactionStore.get();
    transactions.value = transactionStore.$state.transactions.map(item => {
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

const resetForm = () => {
    form.value = {
        transaction_id: "",
        register_id: "",
        registration_fee: 0,
        examination_fee: 0,
        total_fee: 0,
        discount: 0,
        total_payment: 0,
        payment_type: "",
        payment_status: "",
        created_at: "",
        updated_at: ""
    };
    toggleEdit.value = false;
};

const handleFormSubmit = async (action) => {
    if (action === "edit") {
        await transactionStore.edit(form.value);
    }

    if (!transactionStore.$state.isError) {
        resetForm();
        showForm.value = false;
        fetchTransactions();
    }
};

const prepareEditForm = (transaction) => {
    form.value = { ...transaction };
    
    toggleEdit.value = true;
    showForm.value = true;
};

const formattedDatetime = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16); // ambil bagian tahun-bulan-hari jam-menit
}
</script>