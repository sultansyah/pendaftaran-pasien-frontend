<template>
    <div class="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">
            {{ toggleEdit ? "Edit Rekam Medis" : "Tambah Rekam Medis" }}
        </h1>
        <form @submit.prevent="$emit('submit', toggleEdit ? 'edit' : 'add')" class="space-y-4">
            <input type="hidden" v-model="form.medical_record_no" />

            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="patient_name" class="block font-medium">Nama Pasien</label>
                    <input v-model="form.patient_name" id="patient_name" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="gender" class="block font-medium">Jenis Kelamin</label>
                    <select v-model="form.gender" id="gender" class="w-full px-3 py-2 border rounded" required>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                </div>
                <div>
                    <label for="place_of_birth" class="block font-medium">Tempat Lahir</label>
                    <input v-model="form.place_of_birth" id="place_of_birth" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="date_of_birth" class="block font-medium">Tanggal Lahir</label>
                    <input v-model="form.date_of_birth" id="date_of_birth" type="date"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="medical_record_date" class="block font-medium">Tanggal Rekam Medis</label>
                    <input v-model="form.medical_record_date" id="medical_record_date" type="datetime-local"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="birth_weight" class="block font-medium">Berat Lahir (kg)</label>
                    <input v-model="form.birth_weight" id="birth_weight" type="number" step="0.1"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="ethnicity" class="block font-medium">Suku</label>
                    <input v-model="form.ethnicity" id="ethnicity" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
            </div>

            <!-- Contact Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="phone_number" class="block font-medium">Nomor Telepon</label>
                    <input v-model="form.phone_number" id="phone_number" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="address" class="block font-medium">Alamat</label>
                    <input v-model="form.address" id="address" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
            </div>

            <!-- Location Information -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="citizenship" class="block font-medium">Kewarganegaraan</label>
                    <input v-model="form.citizenship" id="citizenship" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="country" class="block font-medium">Negara</label>
                    <input v-model="form.country" id="country" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="language" class="block font-medium">Bahasa</label>
                    <input v-model="form.language" id="language" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="city" class="block font-medium">Kota</label>
                    <input v-model="form.city" id="city" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="subdistrict" class="block font-medium">Kelurahan</label>
                    <input v-model="form.subdistrict" id="subdistrict" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="district" class="block font-medium">Kecamatan</label>
                    <input v-model="form.district" id="district" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="regency" class="block font-medium">Kabupaten</label>
                    <input v-model="form.regency" id="regency" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="province" class="block font-medium">Provinsi</label>
                    <input v-model="form.province" id="province" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="postal_code" class="block font-medium">Kode Pos</label>
                    <input v-model="form.postal_code" id="postal_code" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
            </div>

            <!-- Identity Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="identity_type" class="block font-medium">Jenis Identitas</label>
                    <select v-model="form.identity_type" id="identity_type" class="w-full px-3 py-2 border rounded"
                        required>
                        <option value="KTP">KTP</option>
                        <option value="SIM">SIM</option>
                        <option value="Passport">Passport</option>
                    </select>
                </div>
                <div>
                    <label for="identity_number" class="block font-medium">Nomor Identitas</label>
                    <input v-model="form.identity_number" id="identity_number" type="text"
                        class="w-full px-3 py-2 border rounded" required />
                </div>
                <div>
                    <label for="kk_number" class="block font-medium">Nomor KK</label>
                    <input v-model="form.kk_number" id="kk_number" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
                <div>
                    <label for="npwp" class="block font-medium">NPWP</label>
                    <input v-model="form.npwp" id="npwp" type="text" class="w-full px-3 py-2 border rounded" />
                </div>
            </div>

            <!-- Personal Details -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label for="blood_type" class="block font-medium">Golongan Darah</label>
                    <select v-model="form.blood_type" id="blood_type" class="w-full px-3 py-2 border rounded" required>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                </div>
                <div>
                    <label for="marital_status" class="block font-medium">Status Pernikahan</label>
                    <select v-model="form.marital_status" id="marital_status" class="w-full px-3 py-2 border rounded"
                        required>
                        <option value="Belum Menikah">Belum Menikah</option>
                        <option value="Menikah">Menikah</option>
                        <option value="Cerai">Cerai</option>
                    </select>
                </div>
                <div>
                    <label for="religion" class="block font-medium">Agama</label>
                    <select v-model="form.religion" id="religion" class="w-full px-3 py-2 border rounded" required>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                    </select>
                </div>
            </div>

            <!-- Additional Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label for="education" class="block font-medium">Pendidikan</label>
                    <select v-model="form.education" id="education" class="w-full px-3 py-2 border rounded" required>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Sarjana">Sarjana</option>
                        <option value="Magister">Magister</option>
                        <option value="Doktor">Doktor</option>
                    </select>
                </div>
                <div>
                    <label for="occupation" class="block font-medium">Pekerjaan</label>
                    <input v-model="form.occupation" id="occupation" type="text" class="w-full px-3 py-2 border rounded"
                        required />
                </div>
            </div>

            <!-- Relative Information -->
            <div class="border-t pt-4">
                <h2 class="text-lg font-semibold mb-4">Informasi Kerabat</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="relative_name" class="block font-medium">Nama Kerabat</label>
                        <input v-model="form.relative_name" id="relative_name" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_relationship" class="block font-medium">Hubungan</label>
                        <input v-model="form.relative_relationship" id="relative_relationship" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_phone" class="block font-medium">Nomor Telepon Kerabat</label>
                        <input v-model="form.relative_phone" id="relative_phone" type="tel"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_identity_number" class="block font-medium">Nomor Identitas Kerabat</label>
                        <input v-model="form.relative_identity_number" id="relative_identity_number" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_occupation" class="block font-medium">Pekerjaan Kerabat</label>
                        <input v-model="form.relative_occupation" id="relative_occupation" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_address" class="block font-medium">Alamat Kerabat</label>
                        <input v-model="form.relative_address" id="relative_address" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_city" class="block font-medium">Kota Kerabat</label>
                        <input v-model="form.relative_city" id="relative_city" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="relative_postal_code" class="block font-medium">Kode Pos Kerabat</label>
                        <input v-model="form.relative_postal_code" id="relative_postal_code" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                </div>
            </div>

            <!-- Other Information -->
            <div class="border-t pt-4">
                <h2 class="text-lg font-semibold mb-4">Informasi Lain</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="file_location" class="block font-medium">Lokasi File</label>
                        <input v-model="form.file_location" id="file_location" type="text"
                            class="w-full px-3 py-2 border rounded" required />
                    </div>
                    <div>
                        <label for="mother_medical_record_no" class="block font-medium">Nomor Medical Record Ibu</label>
                        <input v-model="form.mother_medical_record_no" id="mother_medical_record_no" type="text"
                            class="w-full px-3 py-2 border rounded" />
                    </div>
                </div>
            </div>

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                {{ toggleEdit ? "Ubah Rekam Medias" : "Simpan Rekam Medis" }}
            </button>
        </form>
    </div>
</template>

<script setup>
defineProps({
    toggleEdit: Boolean,
    form: Object,
});

defineEmits(['submit']);
</script>