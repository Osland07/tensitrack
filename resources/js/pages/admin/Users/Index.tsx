import AdminUserController from '@/actions/App/Http/Controllers/Admin/AdminUserController';
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

type User = {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[];
    created_at: string;
};

interface UsersIndexProps {
    users: Paginator<User>;
    filters: { search?: string };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Pengguna',
        href: AdminUserController.index.url(),
    },
];

export default function UsersIndex({ users, filters }: UsersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        AdminUserController.index.get({ query: { search } }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Pengguna" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Manajemen Pengguna</h2>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button asChild className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                            <Link href={AdminUserController.create.url()}>Tambah Pengguna</Link>
                        </Button>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Cari pengguna..."
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
                    <h2 className="section-title">Daftar Pengguna</h2>
                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="p-3 text-center">ID</th>
                                    <th className="p-3 text-left">Nama</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Peran</th>
                                    <th className="p-3 text-center">Dibuat Pada</th>
                                    <th className="p-3 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.data.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-3 font-medium text-center">{user.id}</td>
                                        <td className="p-3 text-left">{user.name}</td>
                                        <td className="p-3 text-left">{user.email}</td>
                                        <td className="p-3 text-left">
                                            {user.roles.map(role => role.name).join(', ')}
                                        </td>
                                        <td className="p-3 text-center">{new Date(user.created_at).toLocaleDateString()}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button asChild size="sm" className="btn-modern bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                                                    <Link href={AdminUserController.edit.url(user.id)}>Edit</Link>
                                                </Button>
                                                {/* Delete functionality will be added here */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-3 text-center">
                                            Tidak ada pengguna ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Links */}
                    {users.links && users.links.length > 3 && (
                        <div className="flex justify-center mt-4 space-x-2">
                            {users.links.map((link, index) => (
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