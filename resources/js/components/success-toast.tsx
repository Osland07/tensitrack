import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import './success-toast.css';

export default function SuccessToast() {
    const { props } = usePage();
    const success = (props.flash as { success?: string })?.success;

    useEffect(() => {
        if (success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: success,
                background: 'var(--card)',
                color: 'var(--card-foreground)',
                confirmButtonColor: 'var(--primary)',
            });
        }
    }, [success]);

    return null; // This component doesn't render anything itself
}
