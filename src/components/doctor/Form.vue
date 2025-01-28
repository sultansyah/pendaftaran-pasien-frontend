<template>
    <div class="p-4 max-w-lg mx-auto bg-white rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">
            {{ toggleEdit ? "Edit Dokter" : "Tambah Dokter" }}
        </h1>
        <form @submit.prevent="$emit('submit', toggleEdit ? 'edit' : 'add')" class="space-y-4">
            <input type="hidden" v-model="form.doctor_id" />

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
                <label for="doctor_name" class="block font-medium">Nama Dokter</label>
                <input v-model="form.doctor_name" id="doctor_name" type="text" class="w-full px-3 py-2 border rounded"
                    required />
            </div>

            <div>
                <label for="specialization" class="block font-medium">Spesialisasi</label>
                <input v-model="form.specialization" id="specialization" type="text"
                    class="w-full px-3 py-2 border rounded" required />
            </div>

            <div>
                <label for="days" class="block font-medium">Hari</label>
                <input v-model="form.days" id="days" type="text" class="w-full px-3 py-2 border rounded" required />
            </div>

            <div>
                <label for="start_time" class="block font-medium">Jam Mulai</label>
                <input v-model="form.start_time" id="start_time" type="time" class="w-full px-3 py-2 border rounded"
                    required />
            </div>

            <div>
                <label for="end_time" class="block font-medium">Jam Selesai</label>
                <input v-model="form.end_time" id="end_time" type="time" class="w-full px-3 py-2 border rounded"
                    required />
            </div>

            <div>
                <label for="phone_number" class="block font-medium">Nomor Telepon</label>
                <input v-model="form.phone_number" id="phone_number" type="tel" class="w-full px-3 py-2 border rounded"
                    required />
            </div>

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                {{ toggleEdit ? "Edit Dokter" : "Tambah Dokter" }}
            </button>
        </form>
    </div>
</template>

<script setup>
defineProps({
    toggleEdit: Boolean,
    form: Object,
    polyclinicData: Array,
});
defineEmits(["submit"]);
</script>