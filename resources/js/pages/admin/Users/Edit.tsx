import AdminUserController from '@/actions/App/Http/Controllers/Admin/AdminUserController';
import AdminRoleController from '@/actions/App/Http/Controllers/Admin/AdminRoleController';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Use AppLayout
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    roles: Role[];
};

type UserFormData = {
    name: string;
    email: string;
    role_id: string;
    password?: string;
    password_confirmation?: string;
};

interface UsersEditProps {
    user: User;
    roles: Role[];
}

const breadcrumbs = (user: User): BreadcrumbItem[] => [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Pengguna',
        href: AdminUserController.index.url(),
    },
    {
        title: `Edit Pengguna: ${user.name}`,
        href: AdminUserController.edit.url(user.id),
    },
];

export default function UsersEdit({ user, roles }: UsersEditProps) {
    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        name: user.name,
        email: user.email,
        role_id: user.roles[0]?.id.toString() || '', // Assuming a user has at most one role
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(AdminUserController.update.url(user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(user)}>
            <Head title={`Edit Pengguna: ${user.name}`} />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Edit Pengguna</h2>
                </div>

                <div className="card p-6 md:p-8 space-y-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoFocus
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="role_id">Peran</Label>
                            <Select onValueChange={(value) => setData('role_id', value)} value={data.role_id}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Peran" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id.toString()}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role_id} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password">Password Baru (kosongkan jika tidak ingin mengubah)</Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Konfirmasi Password Baru</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                className="mt-1 block w-full"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Perbarui Pengguna
                            </Button>
                            <Button asChild variant="outline">
                                <Link href={AdminUserController.index.url()}>Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}