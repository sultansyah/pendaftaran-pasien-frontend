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
    },
});
