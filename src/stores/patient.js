import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const usePatientStore = defineStore('patient', {
    state: () => ({
        patients: [],
    }),
    persist: true,
    actions: {
        async get() {
            try {
                const response = await axios.get('/patients');

                if (response.status === 200) {
                    this.patients = response.data.data;
                    toast.success('Get data patient success');
                }
            } catch (error) {
                console.error('Get data patient failed:', error);
                toast.error('Get data patient failed');
            }
        },
    },
});
