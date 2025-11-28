import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="p-4">
                <h1 className="text-2xl">Admin Dashboard</h1>
                <p>Selamat datang di halaman dashboard admin.</p>
            </div>
        </>
    );
}
