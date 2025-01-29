import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const usePolyclinicStore = defineStore('polyclinic', {
    state: () => ({
        polyclinics: [],
    }),
    actions: {
        async get() {
            try {
                const response = await axios.get('/polyclinics');

                if (response.status === 200) {
                    this.polyclinics = response.data.data;
                    toast.success('Get data polyclinic success');
                }
            } catch (error) {
                console.error('Get data polyclinic failed:', error);
                toast.error('Get data polyclinic failed');
            }
        },

        async add(data) {
            try {
                const response = await axios.post('/polyclinics', data);

                if (response.status === 200) {
                    this.polyclinics = response.data.data;
                    toast.success('Berhasil menambah data poliklinik');
                }
            } catch (error) {
                console.error('Get data polyclinic failed:', error);
                toast.error('Gagal menambah data poliklinik');
            }
        },

        async edit(data) {
            try {
                const response = await axios.put(`/polyclinics/${data.clinic_id}`, data);

                if (response.status === 200) {
                    this.polyclinics = response.data.data;
                    toast.success('Berhasil mengubah data poliklinik');
                }
            } catch (error) {
                console.error('Get data polyclinic failed:', error);
                toast.error('Gagal mengubah data poliklinik');
            }
        },
        
        async remove(clinicId) {
            try {
                const response = await axios.delete(`/polyclinics/${clinicId}`);

                if (response.status === 200) {
                    this.polyclinics = response.data.data;
                    toast.success('Berhasil menghapus data poliklinik');
                }
            } catch (error) {
                console.error('Get data polyclinic failed:', error);
                toast.error('Gagal menghapus data poliklinik');
            }
        },
    },
});
