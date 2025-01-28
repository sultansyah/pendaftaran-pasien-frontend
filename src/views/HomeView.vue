<template>
  <!-- Hero Section -->
  <section class="flex-grow bg-blue-600 text-white py-20">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bold mb-7">Selamat Datang di Sistem Pendaftaran Pasien</h2>
      <router-link to="/queue"
        class="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200">
        Lihat Antrian
      </router-link>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">Fitur Unggulan</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-gray-100 rounded-lg shadow">
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Pendaftaran Pasien</h4>
          <p class="text-gray-600">Proses pendaftaran yang cepat dan praktis untuk pasien baru dan lama.</p>
        </div>
        <div class="p-6 bg-gray-100 rounded-lg shadow">
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Manajemen Antrian</h4>
          <p class="text-gray-600">Mengelola antrian pasien dengan lebih teratur dan efisien.</p>
        </div>
        <div class="p-6 bg-gray-100 rounded-lg shadow">
          <h4 class="text-xl font-semibold text-gray-800 mb-2">Data Rekam Medis</h4>
          <p class="text-gray-600">Simpan dan akses data pasien dengan aman dan terpercaya.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">Tentang Kami</h3>
      <p class="text-gray-600 text-center max-w-2xl mx-auto">
        RSU Sakina Idaman adalah rumah sakit yang berkomitmen untuk memberikan pelayanan terbaik kepada pasien dengan
        sistem pendaftaran yang modern dan efisien.
      </p>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center">Hubungi Kami</h3>
      <form class="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Nama" class="w-full p-3 border rounded" />
        <input type="email" placeholder="Email" class="w-full p-3 border rounded" />
        <textarea placeholder="Pesan" class="w-full p-3 border rounded" rows="4"></textarea>
        <button type="submit"
          class="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Kirim</button>
      </form>
    </div>
  </section>
</template>

<script setup>

</script>
