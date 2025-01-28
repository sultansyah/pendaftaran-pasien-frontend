import axios from 'axios'
import { useToast } from 'vue-toastification'

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
    error => {
        try {
            if (error.config?.toastId) {
                toast.dismiss(error.config.toastId)
            }

            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Terjadi kesalahan!'}`)
            } else if (error.request) {
                toast.error('Tidak ada respons dari server!')
            } else {
                toast.error(`Error: ${error.message}`)
            }
        } catch (e) {
            toast.error('Terjadi kesalahan yang tidak terduga!')
        }

        return Promise.reject(error)
    }
)

export default axios