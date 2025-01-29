import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useRegisterStore = defineStore('register', {
    state: () => ({
        registers: [],
        isError: false,
    }),
    actions: {
        async get(query) {
            try {
                const response = await axios.get(`/registers`);

                if (response.status === 200) {
                    this.registers = response.data.data || [];
                    
                    if (query != undefined || query != null) {
                        response.data?.data ? toast.success('Data pendaftaran pasien ditemukan') : toast.error('Data pendaftaran pasien tidak ditemukan')
                    } else {
                        toast.success('Get data register patient success')
                    }
                }
            } catch (error) {
                console.error('Get data register patient failed:', error);
                toast.error('Get data register patient failed');
            }
        },

        async add(data) {
            try {
                data.registration_fee = parseFloat(data.registration_fee)
                data.examination_fee = parseFloat(data.examination_fee)
                data.total_fee = parseFloat(data.total_fee)
                data.total_payment = parseFloat(data.total_payment)
                
                const response = await axios.post('/registers', data);

                if (response.status === 200) {
                    this.registers = response.data.data;
                    toast.success('Berhasil menambah data pendaftaran pasien');
                    this.isError = false
                }
            } catch (error) {
                this.isError = true
                console.error('Get data register patient failed:', error);
                toast.error('Gagal menambah data pendaftaran pasien');
            }
        },

        async edit(data) {
            try {
                const response = await axios.put(`/registers/${data.register_id}`, data);

                if (response.status === 200) {
                    this.registers = response.data.data;
                    toast.success('Berhasil mengubah data pendaftaran pasien');
                    this.isError = false
                }
            } catch (error) {
                this.isError = true
                console.error('Get data register patient failed:', error);
                toast.error('Gagal mengubah data pendaftaran pasien');
            }
        },
        
        async remove(register_id) {
            try {
                const response = await axios.delete(`/registers/${register_id}`);

                if (response.status === 200) {
                    this.registers = response.data.data;
                    toast.success('Berhasil menghapus data pendaftaran pasien');
                }
            } catch (error) {
                console.error('Get data register patient failed:', error);
                toast.error('Gagal menghapus data pendaftaran pasien');
            }
        },
    },
});
