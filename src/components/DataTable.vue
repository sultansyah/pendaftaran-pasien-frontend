<template>
    <div class="p-4 bg-gray-50 rounded-lg shadow">
        <vue-good-table :columns="columns" :rows="data" :search-options="{
            enabled: true,
            placeholder: 'Search...'
        }" :pagination-options="{
            enabled: true,
            perPage: 10
        }" :sort-options="{
            enabled: true
        }" class="border border-gray-200 rounded-lg">
            <template #table-header="{ column }">
                <div class="font-bold text-gray-700">
                    {{ column.label }}
                </div>
            </template>

            <template #table-row="{ row, column }">
                <div :class="['p-2', column.field === 'actions' ? 'text-center' : 'text-left', 'text-gray-600']">
                    <!-- Kolom Actions -->
                    <template v-if="column.field === 'actions'">
                        <button class="px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                            @click="$emit('edit', row)">
                            Edit
                        </button>
                        <button class="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 ml-2"
                            @click="$emit('delete', row)">
                            Delete
                        </button>
                    </template>
                    <!-- Kolom Lain -->
                    <template v-else>
                        {{ row[column.field] }}
                    </template>
                </div>
            </template>

        </vue-good-table>
    </div>
</template>

<script setup>
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

defineProps({
    data: Array,
    columns: Array,
});

defineEmits(['edit', 'delete']);
</script>
