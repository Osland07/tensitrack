import AdminPermissionController from '@/actions/App/Http/Controllers/Admin/AdminPermissionController';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Use AppLayout
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';

type Permission = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
};

type PermissionFormData = {
    name: string;
};

interface PermissionsEditProps {
    permission: Permission;
}

const breadcrumbs = (permission: Permission): BreadcrumbItem[] => [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Izin',
        href: AdminPermissionController.index.url(),
    },
    {
        title: `Edit Izin: ${permission.name}`,
        href: AdminPermissionController.edit.url(permission.id),
    },
];

export default function PermissionsEdit({ permission }: PermissionsEditProps) {
    const { data, setData, put, processing, errors } = useForm<PermissionFormData>({
        name: permission.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(AdminPermissionController.update.url(permission.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(permission)}>
            <Head title={`Edit Izin: ${permission.name}`} />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-section">Edit Izin</h2>
                </div>

                <div className="card p-6 md:p-8 space-y-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Izin</Label>
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

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Perbarui Izin
                            </Button>
                            <Button asChild variant="outline">
                                <Link href={AdminPermissionController.index.url()}>Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}