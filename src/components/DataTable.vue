<template>
    <vue-good-table :columns="columns" :rows="data" :search-options="searchOptions"
        :pagination="paginationOptions" :sort-options="sortOptions" />
</template>

<script setup>
import VueGoodTable from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

defineProps({
    data: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    searchOptions: {
        type: Object,
        default: () => ({
            enabled: true,
            placeholder: 'Search',
        }),
    },
    paginationOptions: {
        type: Object,
        default: () => ({
            enabled: true,
            perPage: 10,
        }),
    },
    sortOptions: {
        type: Object,
        default: () => ({
            enabled: true,
            defaultSortBy: 'name',
            defaultSortOrder: 'asc',
        }),
    },
});
</script>