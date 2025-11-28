import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react'; // Example icons for stats

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="container-admin space-y-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard Admin</h2>
                    {/* Date picker or other controls can go here */}
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pengguna
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div> {/* Placeholder data */}
                            <p className="text-xs text-muted-foreground">
                                +20.1% dari bulan lalu
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Skrining Hari Ini
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+150</div> {/* Placeholder data */}
                            <p className="text-xs text-muted-foreground">
                                +19% dari kemarin
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Risiko Tinggi
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">50</div> {/* Placeholder data */}
                            <p className="text-xs text-muted-foreground">
                                +5% dari minggu lalu
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Rata-rata BMI
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24.5</div> {/* Placeholder data */}
                            <p className="text-xs text-muted-foreground">
                                +1.2 dari bulan lalu
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area - Placeholder for Graphs */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                            <CardDescription>Visualisasi data tren skrining.</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            {/* Placeholder for a chart component */}
                            <div className="h-[350px] bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                                Placeholder Grafik/Chart
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Riwayat Aktivitas Terbaru</CardTitle>
                            <CardDescription>Aktivitas skrining dan pengguna terbaru.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Placeholder for recent activity list */}
                                <div className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                        JD
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">John Doe</p>
                                        <p className="text-sm text-muted-foreground">Melakukan skrining risiko.</p>
                                    </div>
                                    <div className="ml-auto font-medium">1 hari lalu</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-sm font-bold">
                                        JA
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">Jane Adam</p>
                                        <p className="text-sm text-muted-foreground">Memperbarui profil.</p>
                                    </div>
                                    <div className="ml-auto font-medium">3 hari lalu</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
