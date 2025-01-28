export const useGlobalFunctions = () => {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(value)
    }

    // contoh: 2025-01-27
    const getDateToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0 (Januari)
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // contoh: value dari html datetime-local
    const getDatetimeToday = () => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = (now.getMonth() + 1).toString().padStart(2, '0');
        const dd = now.getDate().toString().padStart(2, '0');
        const hh = now.getHours().toString().padStart(2, '0');
        const min = now.getMinutes().toString().padStart(2, '0');

        return `${yyyy}-${mm}-${dd}T${hh}:${min}`
    }

    return {
        formatCurrency,
        getDateToday,
        getDatetimeToday,
    }
}