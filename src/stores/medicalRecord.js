import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useMedicalRecordStore = defineStore('medicalRecord', {
    state: () => ({
        medicalRecords: [],
        isError: false,
    }),
    actions: {
        async get(query) {
            try {
                const response = await axios.get(`/patients?${query ?? ''}`);

                if (response.status === 200) {
                    this.medicalRecords = response.data.data || [];
                    
                    if (query != undefined || query != null) {
                        response.data?.data ? toast.success('Data pasien ditemukan') : toast.error('Data pasien tidak ditemukan')
                    } else {
                        toast.success('Get data medical record success')
                    }
                }
            } catch (error) {
                console.error('Get data medical record failed:', error);
                toast.error('Get data medical record failed');
            }
        },

        async add(data) {
            try {
                const response = await axios.post('/patients', data);

                if (response.status === 200) {
                    this.medicalRecords = response.data.data;
                    toast.success('Berhasil menambah data pasien');
                    this.isError = false
                }
            } catch (error) {
                this.isError = true
                console.error('Get data medical record failed:', error);
                toast.error('Gagal menambah data pasien');
            }
        },

        async edit(data) {
            try {
                const response = await axios.put(`/patients/${data.medical_record_no}`, data);

                if (response.status === 200) {
                    this.medicalRecords = response.data.data;
                    toast.success('Berhasil mengubah data pasien');
                    this.isError = false
                }
            } catch (error) {
                this.isError = true
                console.error('Get data medical record failed:', error);
                toast.error('Gagal mengubah data pasien');
            }
        },
        
        async remove(medical_record_no) {
            try {
                const response = await axios.delete(`/patients/${medical_record_no}`);

                if (response.status === 200) {
                    this.medicalRecords = response.data.data;
                    toast.success('Berhasil menghapus data pasien');
                }
            } catch (error) {
                console.error('Get data medical record failed:', error);
                toast.error('Gagal menghapus data pasien');
            }
        },
    },
});
