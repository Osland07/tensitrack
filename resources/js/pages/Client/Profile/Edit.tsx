import React, { PropsWithChildren, useState } from 'react';
import { Head } from '@inertiajs/react';
import ClientLayout from '@/layouts/Client/ClientLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

// --- Fake Data ---
const initialUserProfile = {
    name: 'John Doe',
    age: 34,
    gender: 'male',
    height: 175,
    weight: 80,
    systolic: 120,
    diastolic: 80,
};

const fakeScreeningHistory = [
    { id: 1, date: '2024-10-15', result: 'Risiko Rendah' },
    { id: 2, date: '2024-07-22', result: 'Risiko Rendah' },
    { id: 3, date: '2024-04-11', result: 'Risiko Sedang' },
];

export default function ProfileUserEdit() {
    // In a real app, this would come from props and be managed with useForm
    const [formData, setFormData] = useState(initialUserProfile);

    // This is just a placeholder for the form submission handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted with data:", formData);
        // In a real app, you would send this data to the backend
    };

    return (
        <>
            <Head title="Profil Pengguna" />

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Profil Pengguna</h1>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Pribadi</CardTitle>
                                <CardDescription>Perbarui informasi pribadi dan data kesehatan Anda.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="age">Usia</Label>
                                            <Input id="age" type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Jenis Kelamin</Label>
                                        <RadioGroup defaultValue={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})} className="flex gap-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="male" id="genderMale" />
                                                <Label htmlFor="genderMale">Laki-laki</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="female" id="genderFemale" />
                                                <Label htmlFor="genderFemale">Perempuan</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    
                                    <Separator />

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="height">Tinggi Badan (cm)</Label>
                                            <Input id="height" type="number" value={formData.height} onChange={(e) => setFormData({...formData, height: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                                            <Input id="weight" type="number" value={formData.weight} onChange={(e) => setFormData({...formData, weight: parseInt(e.target.value) || 0})} />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="systolic">Tensi Sistolik</Label>
                                            <Input id="systolic" type="number" value={formData.systolic} onChange={(e) => setFormData({...formData, systolic: parseInt(e.target.value) || 0})} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="diastolic">Tensi Diastolik</Label>
                                            <Input id="diastolic" type="number" value={formData.diastolic} onChange={(e) => setFormData({...formData, diastolic: parseInt(e.target.value) || 0})} />
                                        </div>
                                    </div>
                                    
                                    <Button type="submit" className="w-full md:w-auto">Simpan Perubahan</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Riwayat Skrining</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead className="text-right">Hasil</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fakeScreeningHistory.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.date}</TableCell>
                                                <TableCell className="text-right font-medium">{item.result}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

ProfileUserEdit.layout = (page: React.ReactElement<PropsWithChildren<{ title?: string }>>) => {
    return <ClientLayout title="Profil Pengguna" hideFooter={true} children={page} />;
};
