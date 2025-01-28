import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useDoctorStore = defineStore('doctor', {
    state: () => ({
        doctors: [],
    }),
    persist: true,
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
    },
});
