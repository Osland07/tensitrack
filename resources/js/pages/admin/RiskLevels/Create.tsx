import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminRiskLevelController from '@/actions/App/Http/Controllers/Admin/AdminRiskLevelController';
import { Form } from '@inertiajs/react'; // Ensure Form is imported

export default function RiskLevelsCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        name: '',
        description: '',
        suggestion: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(AdminRiskLevelController.store.url(), {
            onSuccess: () => reset(), // Reset form on successful submission
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tingkat Risiko', href: AdminRiskLevelController.index.url() }, { title: 'Tambah Tingkat Risiko', href: '#' }]}>
            <Head title="Tambah Tingkat Risiko" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Form Tambah Tingkat Risiko</h2>
                    
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <Label htmlFor="code">Kode</Label>
                            <Input
                                id="code"
                                name="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.code && <p className="text-sm text-red-600">{errors.code}</p>}
                        </div>

                        <div>
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description">Keterangan</Label>
                            <Input
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                        </div>

                        <div>
                            <Label htmlFor="suggestion">Saran</Label>
                            <Input
                                id="suggestion"
                                name="suggestion"
                                value={data.suggestion}
                                onChange={(e) => setData('suggestion', e.target.value)}
                                className="mt-1 block w-full input-modern"
                            />
                            {errors.suggestion && <p className="text-sm text-red-600">{errors.suggestion}</p>}
                        </div>



                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing} className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Simpan
                            </Button>
                            <Button type="button" variant="outline" className="btn-modern" onClick={() => window.history.back()}>
                                Kembali
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}