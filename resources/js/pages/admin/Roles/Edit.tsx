import AdminRoleController from '@/actions/App/Http/Controllers/Admin/AdminRoleController';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Permission = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
    permissions: Permission[];
    created_at: string;
    updated_at: string;
};

type RoleFormData = {
    name: string;
    permissions: number[];
};

interface RolesEditProps {
    role: Role;
    permissions: Permission[];
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

type GroupedPermissions = {
    [resource: string]: {
        [action: string]: Permission | undefined;
    };
};

// Define permission presets
const CLIENT_PERMISSIONS = [
    'profile.view',
    'profile.update',
    'screening.perform',
    'screening.view-history',
    'screening.view-result',
];
const ADMIN_FEATURES_PERMISSIONS = [
    'users.view', 'users.create', 'users.edit', 'users.delete',
    'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
    'permissions.view',
    'risk-levels.view', 'risk-levels.create', 'risk-levels.edit', 'risk-levels.delete', 'risk-levels.print',
    'risk-factors.view', 'risk-factors.create', 'risk-factors.edit', 'risk-factors.delete', 'risk-factors.print',
    'rules.view', 'rules.create', 'rules.edit', 'rules.delete',
    'screening-history.view', 'screening-history.delete', 'screening-history.print',
    'appearance.edit',
];


export default function RolesEdit({ role, permissions }: RolesEditProps) {
    const { data, setData, put, processing, errors } = useForm<RoleFormData>({
        name: role.name,
        permissions: role.permissions.map(p => p.id),
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

    const actions = ['view', 'create', 'edit', 'delete', 'print'];

    const groupedPermissions = permissions.reduce((acc, p) => {
        const [resource, action] = p.name.split('.');
        if (!acc[resource]) {
            acc[resource] = {};
        }
        acc[resource][action] = p;
        return acc;
    }, {} as GroupedPermissions);

    // Function to get a display-friendly name for a resource
    const getResourceDisplayName = (resource: string) => {
        return resource.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const selectPermissions = (permissionNames: string[]) => {
        const permissionIds = permissions
            .filter(p => permissionNames.includes(p.name))
            .map(p => p.id);
        setData('permissions', permissionIds);
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

                        {/* Permissions Assignment Table */}
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Manajemen Izin</Label>

                            <div className="flex flex-wrap gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => selectPermissions(permissions.map(p => p.name))}>Pilih Semua</Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => setData('permissions', [])}>Hapus Semua</Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => selectPermissions(CLIENT_PERMISSIONS)}>Hanya Akses Klien</Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => selectPermissions(ADMIN_FEATURES_PERMISSIONS)}>Hanya Fitur Admin</Button>
                            </div>

                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="font-bold">Hak Akses</TableHead>
                                            {actions.map(action => (
                                                <TableHead key={action} className="text-center font-bold capitalize">{action}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.keys(groupedPermissions).sort().map(resource => (
                                            <TableRow key={resource}>
                                                <TableCell className="font-medium">{getResourceDisplayName(resource)}</TableCell>
                                                {actions.map(action => {
                                                    const permission = groupedPermissions[resource][action];
                                                    return (
                                                        <TableCell key={action} className="text-center">
                                                            {permission ? (
                                                                <Checkbox
                                                                    id={`perm-${permission.id}`}
                                                                    checked={data.permissions.includes(permission.id)}
                                                                    onCheckedChange={(checked) => handlePermissionChange(permission.id, checked === true)}
                                                                />
                                                            ) : null}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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