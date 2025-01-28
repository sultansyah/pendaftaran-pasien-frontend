import { defineStore } from 'pinia'
import axios from '../axios'
import { useToast } from 'vue-toastification';

const toast = useToast()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    persist: true,
    actions: {
        async login(staff_code, staff_name, password, date) {
            try {
                const response = await axios.post('/auth/login', { staff_code, staff_name, password, date });

                if (response.status === 200) {
                    this.user = response.data.data;
                    this.isAuthenticated = true;
                    toast.success('Login success');
                }
            } catch (error) {
                console.error('Login failed:', error);
                toast.error('Login failed');
            }
        },

        async forgotPassword(staff_code, staff_name, password) {
            try {
                const response = await axios.post('/auth/forgot-password', { staff_code, staff_name, password});

                if (response.status === 200) {
                    this.user = response.data.data;
                    this.isAuthenticated = true;
                    toast.success('Login success');
                }
            } catch (error) {
                console.error('Change password failed:', error);
                toast.error('Change password failed');
            }
        },

        async logout() {
            try {
                await axios.post('/auth/logout');
                this.user = null;
                this.isAuthenticated = false;
                toast.success('Logout success');
            } catch (error) {
                toast.error('Logout failed')
            }
        },
    },
});
