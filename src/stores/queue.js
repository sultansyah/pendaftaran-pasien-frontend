import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useQueueStore = defineStore('queue', {
    state: () => ({
        queues: [],
    }),
    actions: {
        async get(query) {
            try {
                const response = await axios.get(`/queues?${query}`);

                if (response.status === 200) {
                    this.queues = response.data.data;
                    toast.success('Get data queue success');
                }
            } catch (error) {
                console.error('Get data queue failed:', error);
                toast.error('Get data queue failed');
            }
        },
    },
});
