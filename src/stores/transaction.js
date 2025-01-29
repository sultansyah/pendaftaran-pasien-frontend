import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';
import { inject } from 'vue';

const toast = useToast()

const globalFunctions = inject('globalFunctions')

export const useTransactionStore = defineStore('transaction', {
    state: () => ({
        transactions: [],
        isError: false,
    }),
    actions: {
        async get() {
            try {
                const response = await axios.get(`/transactions`);

                if (response.status === 200) {
                    this.transactions = response.data.data || [];

                    response.data?.data ? toast.success('Data transaksi ditemukan') : toast.error('Data transaksi tidak ditemukan')
                }
            } catch (error) {
                console.error('Get data transaction failed:', error);
                toast.error('Get data transaction failed');
            }
        },

        async edit(data) {
            try {
                data.registration_fee = parseFloat(data.registration_fee)
                data.examination_fee = parseFloat(data.examination_fee)
                data.total_fee = parseFloat(data.total_fee)
                data.total_payment = parseFloat(data.total_payment)

                const response = await axios.put(`/transactions/${data.transaction_id}`, data);

                if (response.status === 200) {
                    this.transactions = response.data.data;
                    toast.success('Berhasil mengubah data transaksi');
                    this.isError = false
                }
            } catch (error) {
                this.isError = true
                console.error('Get data transaction failed:', error);
                toast.error('Gagal mengubah data transaksi');
            }
        },
    },
});
