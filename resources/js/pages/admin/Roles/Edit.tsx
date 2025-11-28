import AdminRoleController from '@/actions/App/Http/Controllers/Admin/AdminRoleController';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react'; // Import useState
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox'; // Import Checkbox

type Permission = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
    permissions: Permission[]; // Role now has permissions
    created_at: string;
    updated_at: string;
};

type RoleFormData = {
    name: string;
    permissions: number[]; // Array of selected permission IDs
};

interface RolesEditProps {
    role: Role;
    permissions: Permission[]; // All available permissions
}

const breadcrumbs = (role: Role): BreadcrumbItem[] => [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Peran',
        href: AdminRoleController.index.url(),
    },
    {
        title: `Edit Peran: ${role.name}`,
        href: AdminRoleController.edit.url(role.id),
    },
];

export default function RolesEdit({ role, permissions }: RolesEditProps) {
    const { data, setData, put, processing, errors } = useForm<RoleFormData>({
        name: role.name,
        permissions: role.permissions.map(p => p.id), // Pre-select existing permissions
    });

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        setData('permissions', checked
            ? [...data.permissions, permissionId]
            : data.permissions.filter(id => id !== permissionId)
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(AdminRoleController.update.url(role.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(role)}>
            <Head title={`Edit Peran: ${role.name}`} />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Edit Peran</h2>
                </div>

                <div className="card p-6 md:p-8 space-y-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Peran</Label>
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

                        {/* Permissions Assignment */}
                        <div>
                            <Label>Izin</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                                {permissions.map(permission => (
                                    <div key={permission.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`permission-${permission.id}`}
                                            checked={data.permissions.includes(permission.id)}
                                            onCheckedChange={(checked) => handlePermissionChange(permission.id, checked === true)}
                                        />
                                        <Label htmlFor={`permission-${permission.id}`}>{permission.name}</Label>
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.permissions} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing}>
                                Perbarui Peran
                            </Button>
                            <Button asChild variant="outline">
                                <Link href={AdminRoleController.index.url()}>Batal</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}