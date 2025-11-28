import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminRiskFactorController from '@/actions/App/Http/Controllers/Admin/AdminRiskFactorController';

// Define the type for a single RiskFactor
type RiskFactor = {
    id: number;
    code: string;
    name: string;
};

// The props for the component now include the riskFactor to edit
export default function RiskFactorsEdit({ riskFactor }: { riskFactor: RiskFactor }) {
    // Initialize the form with the existing risk factor data
    const { data, setData, patch, processing, errors } = useForm({
        code: riskFactor.code,
        name: riskFactor.name,
    });

    // Handle form submission
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use PATCH for updating
        patch(AdminRiskFactorController.update.url(riskFactor.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Faktor Risiko', href: AdminRiskFactorController.index.url() }, { title: 'Edit Faktor Risiko' }]}>
            <Head title="Edit Faktor Risiko" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8">
                    <h2 className="section-title">Form Edit Faktor Risiko</h2>
                    
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

                        <div className="flex items-center gap-4">
                            <Button type="submit" disabled={processing} className="btn-modern bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                                Simpan Perubahan
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
