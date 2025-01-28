import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients: [],
    }),
    actions: {
        async get(query) {
            try {
                const response = await axios.get(`/patients?${query ?? ''}`);

                if (response.status === 200) {
                    this.patients = response.data.data || [];
                    
                    if (query != undefined || query != null) {
                        response.data?.data ? toast.success('Data pasien ditemukan') : toast.error('Data pasien tidak ditemukan')
                    } else {
                        toast.success('Get data patient success')
                    }
                }
            } catch (error) {
                console.error('Get data patient failed:', error);
                toast.error('Get data patient failed');
            }
        },
    },
});
