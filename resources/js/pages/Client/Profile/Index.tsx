import ClientProfileController from '@/actions/App/Http/Controllers/Client/ClientProfileController';
import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/Client/ClientLayout'; // Assuming AppLayout is the correct client layout
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { type BreadcrumbItem } from '@/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { pickBy } from 'lodash';
import { Input } from '@/components/ui/input';

type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

type User = {
    id: number;
    name: string;
    email: string;
    height?: number;
    weight?: number;
    bmi?: number;
    age?: number;
    created_at: string;
};

type ScreeningHistory = {
    id: number;
    screening_date: string;
    screening_result: string;
    bmi: number;
    totalScore?: number; // Assuming total score is part of history
    created_at: string;
};

interface ClientProfileProps {
    user: User;
    screeningHistories: Paginator<ScreeningHistory>;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: 'Profil Saya',
        href: ClientProfileController.index.url(),
    },
];

export default function ClientProfileIndex({ user, screeningHistories, filters }: ClientProfileProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // This search would typically filter screening histories for the user
        ClientProfileController.index.get({ query: { search } }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <ClientLayout breadcrumbs={breadcrumbs}>
            <Head title="Profil Saya" />

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-primary mb-6">Profil Pengguna</h2>

                {/* User Info Card */}
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2">Informasi Pribadi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium text-muted-foreground">Nama:</p>
                            <p className="text-lg">{user.name}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Email:</p>
                            <p className="text-lg">{user.email}</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Umur:</p>
                            <p className="text-lg">{user.age ?? '-'} Tahun</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Tinggi Badan:</p>
                            <p className="text-lg">{user.height ?? '-'} cm</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">Berat Badan:</p>
                            <p className="text-lg">{user.weight ?? '-'} kg</p>
                        </div>
                        <div>
                            <p className="font-medium text-muted-foreground">BMI:</p>
                            <p className="text-lg">{user.bmi ?? '-'} kg/m²</p>
                        </div>
                        {/* Tensi - needs to be added from screening history or user model */}
                        <div>
                            <p className="font-medium text-muted-foreground">Tensi Terakhir:</p>
                            <p className="text-lg">Belum Tersedia</p> {/* Placeholder for Tensi */}
                        </div>
                    </div>
                    {/* Add an edit profile button here if needed */}
                </div>

                {/* Screening History */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h3 className="text-xl font-semibold">Riwayat Skrining</h3>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Cari riwayat..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-modern"
                            />
                            <Button type="submit" className="btn-modern">
                                Cari
                            </Button>
                        </form>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-left">Tanggal</th>
                                    <th className="p-3 text-center">BMI</th>
                                    <th className="p-3 text-left">Hasil Skrining</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screeningHistories.data.map((history) => (
                                    <tr key={history.id} className="border-t">
                                        <td className="p-3 text-left">{new Date(history.screening_date).toLocaleDateString()}</td>
                                        <td className="p-3 text-center">{history.bmi}</td>
                                        <td className="p-3 text-left">{history.screening_result}</td>
                                        <td className="p-3 text-center">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/screening/${history.id}`}>Lihat Detail</Link> {/* Link to individual screening detail */}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {screeningHistories.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-3 text-center text-muted-foreground">
                                            Tidak ada riwayat skrining.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    {screeningHistories.links && screeningHistories.links.length > 3 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {screeningHistories.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 border rounded-md ${link.active ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}