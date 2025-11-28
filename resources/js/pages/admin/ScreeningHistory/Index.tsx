import AdminScreeningHistoryController from '@/actions/App/Http/Controllers/Admin/AdminScreeningHistoryController';
import { router, Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'; // Import useState
import ScreeningHistoryDetailModal from '@/components/ScreeningHistoryDetailModal'; // Import custom modal component
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'; // Keep AlertDialog for delete confirmation

// Define a basic Paginator type
type Paginator<T> = {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

// Define the User and RiskLevel types
type User = {
    id: number;
    name: string;
};

type RiskLevel = {
    id: number;
    name: string;
};

// Define the RiskFactor type (re-defined here for table props type)
type RiskFactor = {
    id: number;
    name: string;
    pivot: {
        answer: string;
    };
};

// Define the ScreeningHistory type (re-defined here for table props type)
type ScreeningHistory = {
    id: number;
    user: User;
    risk_level: RiskLevel;
    screening_date: string;
    screening_result: string;
    bmi: number;
    created_at: string;
    risk_factors: RiskFactor[]; // Add riskFactors here
};

// Update props type to include paginated data and filters
export default function ScreeningHistoryIndex({ screeningHistories, filters }: { screeningHistories: Paginator<ScreeningHistory>, filters: { search?: string } }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State for detail modal
    const [selectedHistory, setSelectedHistory] = useState<ScreeningHistory | null>(null); // State for selected history

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        AdminScreeningHistoryController.index.get({ query: { search } });
    };

    const openDetailModal = (history: ScreeningHistory) => {
        setSelectedHistory(history);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedHistory(null);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Riwayat Skrining', href: AdminScreeningHistoryController.index.url() }]}>
            <Head title="Riwayat Skrining" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Riwayat Skrining</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            className="btn-modern bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white"
                            onClick={() => window.open(AdminScreeningHistoryController.print.url(), '_blank')}
                        >
                            Cetak
                        </Button>
                    </div>
                </div>

                <div className="card p-6 md:p-8 space-y-6 min-h-[60vh]">
                    <div className="flex justify-between items-center">
                        <h2 className="section-title">Daftar Riwayat Skrining</h2>
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Cari..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="input-modern"
                            />
                            <Button type="submit" className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Cari
                            </Button>
                        </form>
                    </div>

                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-center">Nama Pengguna</th>
                                    <th className="p-3 text-center">Tingkat Risiko</th>
                                    <th className="p-3 text-center">Hasil Skrining</th>
                                    <th className="p-3 text-center">BMI</th>
                                    <th className="p-3 text-center">Tanggal Skrining</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screeningHistories.data.map((history) => (
                                    <tr key={history.id} className="border-t">
                                        <td className="p-3 font-medium text-center">{history.user.name}</td>
                                        <td className="p-3 text-center">{history.risk_level.name}</td>
                                        <td className="p-3 text-center">{history.screening_result}</td>
                                        <td className="p-3 text-center">{history.bmi}</td>
                                        <td className="p-3 text-center">{new Date(history.screening_date).toLocaleDateString('id-ID')}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button size="sm" className="btn-modern bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                                                    onClick={() => openDetailModal(history)}>
                                                    Detail
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size="sm" variant="destructive" className="btn-modern">
                                                            Hapus
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="max-w-[calc(100%-40%)]">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Data yang dihapus tidak dapat dikembalikan!
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    router.delete(AdminScreeningHistoryController.destroy.url(history.id), {
                                                                        preserveScroll: true,
                                                                    });
                                                                }}
                                                            >
                                                                Ya, hapus!
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {screeningHistories.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-3 text-center">
                                            No screening histories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

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

            {/* Detail Modal */}
            <ScreeningHistoryDetailModal
                isOpen={isDetailModalOpen}
                onClose={closeDetailModal}
                history={selectedHistory}
            />
        </AppLayout>
    );
}
