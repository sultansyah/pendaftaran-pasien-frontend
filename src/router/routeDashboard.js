import DoctorView from "@/views/DoctorView.vue";
import MedicalRecordView from "@/views/MedicalRecordView.vue";
import PolyclinicView from "@/views/PolyclinicView.vue";
import QueueView from "@/views/QueueView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TransactionView from "@/views/TransactionView.vue";
import VerifikasiLamaAtauBaruView from "@/views/VerifikasiLamaAtauBaruView.vue";

export const routeDashboard = [
    {
        path: '/verification-patient',
        name: 'verification-patient',
        component: VerifikasiLamaAtauBaruView,
        meta: { requiresAuth: true }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { requiresAuth: true }
    },
    {
        path: '/medical-record',
        name: 'medical-record',
        component: MedicalRecordView,
        meta: { requiresAuth: true }
    },
    {
    path: '/queue',
        name: 'queue',
        component: QueueView,
        meta: { requiresAuth: true }
    },
    {
        path: '/doctor',
        name: 'doctor',
        component: DoctorView,
        meta: { requiresAuth: true }
    },
    {
        path: '/polyclinic',
        name: 'polyclinic',
        component: PolyclinicView,
        meta: { requiresAuth: true }
    },
    {
        path: '/transaction',
        name: 'transaction',
        component: TransactionView,
        meta: { requiresAuth: true }
    },
]