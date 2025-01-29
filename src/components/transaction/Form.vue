<template>
    <div class="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">
            Edit Transaksi
        </h1>
        <form @submit.prevent="$emit('submit', 'edit')" class="space-y-4">
            <input type="hidden" v-model="form.transaction_id" />

            <!-- Transaction Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="register_id" class="block font-medium">ID Transaksi</label>
                    <input v-model="form.register_id" id="register_id" type="text"
                        class="w-full px-3 py-2 border rounded" required disabled />
                </div>
                <div>
                    <label for="registration_fee" class="block font-medium">Biaya Registrasi</label>
                    <input v-model="form.registration_fee" id="registration_fee" type="text" @input="calculateTotalCost"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="examination_fee" class="block font-medium">Biaya Pemeriksaan</label>
                    <input v-model="form.examination_fee" id="examination_fee" type="text" @input="calculateTotalCost"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="total_fee" class="block font-medium">Total Biaya</label>
                    <input v-model="form.total_fee" id="total_fee" type="text" class="w-full px-3 py-2 border rounded"
                        required disabled />
                </div>
                <div>
                    <label for="discount" class="block font-medium">Diskon Biaya %</label>
                    <input v-model="form.discount" id="discount" type="number" step="0.1" @input="calculateTotalCost"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="total_payment" class="block font-medium">Total Bayar</label>
                    <input v-model="form.total_payment" id="total_payment" type="text"
                        class="w-full px-3 py-2 border rounded" required disabled />
                </div>
                <div>
                    <label for="payment_type" class="block font-medium">Jenis Pembayaran</label>
                    <select v-model="form.payment_type" id="payment_type" class="w-full px-3 py-2 border rounded">
                        <option value="cash">Cash</option>
                        <option value="qris" disabled>QRIS</option>
                        <option value="back_transfer" disabled>Bank Transfer</option>
                        <option value="credit_card" disabled>Credit Card</option>
                    </select>
                </div>
                <div>
                    <label for="payment_status" class="block font-medium">Status Pembayaran</label>
                    <select v-model="form.payment_status" id="payment_status" class="w-full px-3 py-2 border rounded"
                        required>
                        <option value="PAID">Lunas</option>
                        <option value="UNPAID">Belum Lunas</option>
                        <option value="PENDING">Menunggu</option>
                    </select>
                </div>
            </div>

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Ubah Transaksi
            </button>
        </form>
    </div>
</template>

<script setup>
defineEmits(['submit']);

import { defineProps } from 'vue';

const props = defineProps({
    toggleEdit: Boolean,
    form: Object,
});

const calculateTotalCost = () => {
    const registrationFee = parseFloat(props.form.registration_fee) || 0;
    const examinationFee = parseFloat(props.form.examination_fee) || 0;
    const discount = parseFloat(props.form.discount) || 0;

    // hitung total biaya
    const totalFee = registrationFee + examinationFee;
    props.form.total_fee = totalFee;

    // hitung total bayar setelah diskon
    const totalPayment = totalFee - (totalFee * (discount / 100));
    props.form.total_payment = totalPayment;
}
</script>
