<template>
    <div class="p-4 max-w-lg mx-auto bg-white rounded-lg shadow">
        <h1 class="text-xl font-bold mb-4">
            {{ toggleEdit ? "Edit Poliklinik" : "Tambah Poliklinik" }}
        </h1>
        <form @submit.prevent="$emit('submit', toggleEdit ? 'edit' : 'add')" class="space-y-4">

            <input type="hidden" v-model="form.clinic_id" />

            <div>
                <label for="clinic_name" class="block font-medium">Nama Poliklinik</label>
                <input v-model="form.clinic_name" id="clinic_name" type="text" class="w-full px-3 py-2 border rounded"
                    required />
            </div>

            <div>
                <label for="location" class="block font-medium">Lokasi</label>
                <input v-model="form.location" id="location" type="text"
                    class="w-full px-3 py-2 border rounded" required />
            </div>

            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                {{ toggleEdit ? "Edit Poliklinik" : "Tambah Poliklinik" }}
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