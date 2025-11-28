import AdminPermissionController from '@/actions/App/Http/Controllers/Admin/AdminPermissionController';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout'; // Use AppLayout
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';

type PermissionFormData = {
    name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Manajemen Izin',
        href: AdminPermissionController.index.url(),
    },
    {
        title: 'Buat Izin Baru',
        href: AdminPermissionController.create.url(),
    },
];

export default function PermissionsCreate() {
    const { data, setData, post, processing, errors } = useForm<PermissionFormData>({
        name: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(AdminPermissionController.store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Izin Baru" />

            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 flex items-center justify-between">
                    <h2 className="section-title">Buat Izin Baru</h2>
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
                                Simpan Izin
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