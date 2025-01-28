import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useAuthStore } from './stores/auth'
import router from './router'

const toast = useToast()

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080/api/v1'

axios.interceptors.request.use(
    config => {
        config.toastId = toast.info('Loading...')
        return config
    },
    error => {
        if (error.config?.toastId) {
            toast.dismiss(error.config.toastId)
        }
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        if (response.config?.toastId) {
            toast.dismiss(response.config.toastId)
        }
        return response
    },
    async error => {
        try {
            if (error.config?.toastId) {
                toast.dismiss(error.config.toastId)
            }

            if (error.response) {
                console.error(`Error: ${error.response.data.message || 'Terjadi kesalahan!'}`)

                const status = error.response.data.status
                const code = error.response.data.code

                if (status == "unauthorized" || code == 401) {
                    toast.clear()

                    const authStore = useAuthStore()
                    await authStore.refreshToken()
                    if (!authStore.$state.isAuthenticated) {
                        router.push('/login')
                    } else {
                        window.location.reload()
                    }
                } else {
                    console.error(`Error: ${message}`)
                    toast.error(message)
                }
            } else if (error.request) {
                toast.error('Tidak ada respons dari server!')
            } else {
                console.error(`Error: ${error.message}`)
            }
        } catch (e) {
            toast.error('Terjadi kesalahan yang tidak terduga!')
        }

        return Promise.reject(error)
    }
)

export default axios