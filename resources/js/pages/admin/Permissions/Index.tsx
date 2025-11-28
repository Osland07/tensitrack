import AdminPermissionController from '@/actions/App/Http/Controllers/Admin/AdminPermissionController';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Use AppLayout
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

type Permission = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

interface PermissionsIndexProps {
    permissions: Paginator<Permission>;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Izin',
        href: AdminPermissionController.index.url(),
    },
];

export default function PermissionsIndex({ permissions, filters }: PermissionsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        AdminPermissionController.index.get({ query: { search } }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Izin" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Manajemen Izin</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button asChild className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                            <Link href={AdminPermissionController.create.url()}>Tambah Izin</Link>
                        </Button>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Cari izin..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input-modern"
                        />
                        <Button type="submit" className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                            Cari
                        </Button>
                    </form>
                </div>

                <div className="card p-6 md:p-8 space-y-6 min-h-[60vh]">
                    <h2 className="section-title">Daftar Izin</h2>
                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-center">ID</th>
                                    <th className="p-3 text-left">Nama Izin</th>
                                    <th className="p-3 text-center">Dibuat Pada</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {permissions.data.map((permission) => (
                                    <tr key={permission.id} className="border-t">
                                        <td className="p-3 font-medium text-center">{permission.id}</td>
                                        <td className="p-3 text-left">{permission.name}</td>
                                        <td className="p-3 text-center">{new Date(permission.created_at).toLocaleDateString()}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button asChild size="sm" className="btn-modern bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                                                    <Link href={AdminPermissionController.edit.url(permission.id)}>Edit</Link>
                                                </Button>
                                                {/* Delete functionality will be added here */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {permissions.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-3 text-center">
                                            Tidak ada izin ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    {permissions.links && permissions.links.length > 3 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {permissions.links.map((link, index) => (
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
        </AppLayout>
    );
}