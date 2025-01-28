<template>
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex-none p-4">
        <nav>
            <ul class="space-y-4">
                <li>
                    <RouterLink to="/dashboard" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Dashboard
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/verification-patient" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Verifikasi Pasien Baru / Lama
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/register" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Pendaftaran Antrian Pasien
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/medical-record" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Rekam Medis
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/queue" class="text-gray-300 hover:text-white" active-class="font-bold text-white">
                        Manajemen Antrian
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/doctor" class="text-gray-300 hover:text-white" active-class="font-bold text-white">
                        Manajemen Dokter
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/polyclinic" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Manajemen Poliklinik
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/transaction" class="text-gray-300 hover:text-white"
                        active-class="font-bold text-white">
                        Manajemen Transaksi
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
