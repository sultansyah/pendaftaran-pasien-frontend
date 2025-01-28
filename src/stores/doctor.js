import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useDoctorStore = defineStore('doctor', {
    state: () => ({
        doctors: [],
    }),
    actions: {
        async get() {
            try {
                const response = await axios.get('/doctors');

                if (response.status === 200) {
                    this.doctors = response.data.data;
                    toast.success('Get data doctor success');
                }
            } catch (error) {
                console.error('Get data doctor failed:', error);
                toast.error('Get data doctor failed');
            }
        },

        async add(data) {
            try {
                const response = await axios.post('/doctors', data);

                if (response.status === 200) {
                    this.doctors = response.data.data;
                    toast.success('Berhasil menambah data dokter');
                }
            } catch (error) {
                console.error('Get data doctor failed:', error);
                toast.error('Gagal menambah data dokter');
            }
        },

        async edit(data) {
            try {
                const response = await axios.put(`/doctors/${data.doctor_id}`, data);

                if (response.status === 200) {
                    this.doctors = response.data.data;
                    toast.success('Berhasil mengubah data dokter');
                }
            } catch (error) {
                console.error('Get data doctor failed:', error);
                toast.error('Gagal mengubah data dokter');
            }
        },
        
        async remove(doctorId) {
            try {
                const response = await axios.delete(`/doctors/${doctorId}`);

                if (response.status === 200) {
                    this.doctors = response.data.data;
                    toast.success('Berhasil menghapus data dokter');
                }
            } catch (error) {
                console.error('Get data doctor failed:', error);
                toast.error('Gagal menghapus data dokter');
            }
        },
    },
});
