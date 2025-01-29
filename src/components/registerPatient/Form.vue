<template>
    <div class="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">
            {{ toggleEdit ? "Edit Pendaftaran" : "Tambah Pendaftaran" }}
        </h1>
        <form @submit.prevent="$emit('submit', toggleEdit ? 'edit' : 'add')" class="space-y-4">
            <input type="hidden" v-model="form.register_id" />
            <input type="hidden" v-model="form.medical_record_no" />

            <div class="mb-4">
                <label for="identity_type" class="block font-medium">Jenis Identitas</label>
                <select v-model="identityType" id="identity_type" class="w-full px-3 py-2 border rounded">
                    <option value="KTP">KTP</option>
                    <option value="SIM">SIM</option>
                    <option value="Passport">Passport</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="identityNumber" class="block text-sm font-semibold text-gray-700 mb-2">
                    No Identitas
                </label>
                <input type="text" id="identityNumber" v-model="identityNumber"
                    class="w-full px-3 py-2 border rounded" placeholder="Masukkan no pengenal" />
            </div>

            <!-- Pesan Error -->
            <transition name="fade">
                <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
                    <div class="flex items-center space-x-3">
                        <svg class="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v3m0 4h.01M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 12 2s10 4.477 10 10z" />
                        </svg>
                        <p class="text-sm font-medium">{{ error }}</p>
                    </div>
                    <a href="/medical-record" class="mt-2 block text-blue-600 hover:underline">Daftarkan pasien?</a>
                </div>
            </transition>

            <div>
                <label for="medical_record_no" class="block font-medium">Medical Record No</label>
                <input v-model="form.medical_record_no" id="medical_record_no" type="text"
                    class="w-full px-3 py-2 border rounded" required />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="session_polyclinic" class="block font-medium">Sesi Poliklinik</label>
                    <select v-model="form.session_polyclinic" id="session_polyclinic"
                        class="w-full px-3 py-2 border rounded" required>
                        <option value="Fullday">Sehari Penuh</option>
                        <option value="Morning">Pagi</option>
                        <option value="Afternoon">Siang</option>
                    </select>
                </div>
                <div>
                    <label for="clinic_id" class="block font-medium">Pilih Poliklinik:</label>
                    <select v-model="form.clinic_id" id="clinic_id" class="w-full border rounded px-3 py-2" required>
                        <option value="" disabled>Pilih...</option>
                        <option v-for="clinic in polyclinicData" :key="clinic.clinic_id" :value="clinic.clinic_id">
                            {{ clinic.clinic_name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="doctor_id" class="block font-medium">Pilih Dokter:</label>
                    <select v-model="form.doctor_id" id="doctor_id" class="w-full border rounded px-3 py-2" required>
                        <option value="" disabled>Pilih...</option>
                        <option v-for="doctor in filteredDoctors" :key="doctor.doctor_id" :value="doctor.doctor_id">
                            {{ doctor.doctor_name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="department" class="block font-medium">Instalasi</label>
                    <input v-model="form.department" id="department" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="class" class="block font-medium">Kelas</label>
                    <input v-model="form.class" id="class" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="entry_method" class="block font-medium">Cara Masuk</label>
                    <input v-model="form.entry_method" id="entry_method" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="admission_fee" class="block font-medium">Tarif Masuk</label>
                    <input v-model="form.admission_fee" id="admission_fee" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="medical_procedure" class="block font-medium">Tindakan</label>
                    <input v-model="form.medical_procedure" id="medical_procedure" type="text"
                        class="w-full px-3 py-2 border rounded" required />
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
                {{ toggleEdit ? "Ubah Pendaftaran" : "Simpan Pendaftaran" }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { useMedicalRecordStore } from '@/stores/medicalRecord';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

defineEmits(['submit']);

const props = defineProps({
    toggleEdit: Boolean,
    form: Object,
    polyclinicData: Array,
    doctorData: Array,
});

const filteredDoctors = computed(() =>
    props.doctorData.filter(doctor => doctor.clinic_id == props.form.clinic_id)
);

const route = useRoute()

const identityNumber = ref(route.params.identityNumber);
const identityType = ref(route.params.identityType);
const error = ref('');
let timeout = null;

const medicalRecord = useMedicalRecordStore();

onMounted(async () => {
    if (route.params.identityNumber && route.params.identityType && route.params.medicalRecordNo) {
        await verification()
    }
})

const verification = async () => {
    await medicalRecord.get(`identity_number=${identityNumber.value}&identity_type=${identityType.value}`);

    if (medicalRecord.$state.medicalRecords.length === 0) {
        error.value = "No pengenal tidak ditemukan"
        props.form.medical_record_no = ""
    } else {
        error.value = ""
        props.form.medical_record_no = medicalRecord.$state.medicalRecords[0].medical_record_no
    }
};

watch([identityNumber, identityType], () => {
    if (!identityNumber.value || !identityType.value) {
        error.value = '';
        return;
    }

    clearTimeout(timeout);
    timeout = setTimeout(verification, 1000);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
