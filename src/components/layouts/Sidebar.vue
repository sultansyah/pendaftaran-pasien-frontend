<template>
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex-none p-4">
        <nav>
            <ul class="space-y-4">
                <li><router-link to="/dashboard" class="text-gray-300 hover:text-white">Dashboard</router-link></li>
                <li><router-link to="/pendaftaran" class="text-gray-300 hover:text-white">Verifikasi Pasien Baru / Lama</router-link></li>
                <li><router-link to="/pendaftaran" class="text-gray-300 hover:text-white">Pendaftaran Antrian Pasien
                        Pasien</router-link></li>
                <li><router-link to="/rekam-medis" class="text-gray-300 hover:text-white">Rekam Medis</router-link></li>
                <li><router-link to="/antrian" class="text-gray-300 hover:text-white">Manajemen Antrian</router-link>
                </li>
                <li><router-link to="/doctor" class="text-gray-300 hover:text-white">Manajemen Doctor</router-link>
                </li>
                <li><router-link to="/polyclinic" class="text-gray-300 hover:text-white">Manajemen
                        Poliklinik</router-link>
                </li>
                <li><router-link to="/transaction" class="text-gray-300 hover:text-white">Manajemen
                        Transaksi</router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
</script>