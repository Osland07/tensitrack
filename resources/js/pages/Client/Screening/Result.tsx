import React from 'react';
import ClientLayout from '@/layouts/Client/ClientLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define types for data passed from backend
interface User {
    id: number;
    name: string;
    // Add other user properties if needed
}

interface RiskLevel {
    id: number;
    name: string;
    description: string;
    suggestion: string;
}

interface RiskFactor {
    id: number;
    name: string;
    description: string;
    // Pivot data from screening_history_risk_factor
    pivot: {
        screening_history_id: number;
        risk_factor_id: number;
        answer: boolean;
    };
}

interface ScreeningHistory {
    id: number;
    user_id: number;
    screening_date: string; // ISO 8601 string
    screening_result: string;
    risk_level_id: number;
    created_at: string;
    updated_at: string;
    user: User;
    risk_level: RiskLevel;
    risk_factors: RiskFactor[];
}

interface ScreeningResultProps {
    screeningHistory: ScreeningHistory;
}

export default function ScreeningResult({ screeningHistory }: ScreeningResultProps) {
    const screeningDate = new Date(screeningHistory.screening_date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <ClientLayout>
            <Head title="Hasil Skrining Hipertensi" />
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-primary mb-2">Hasil Skrining Hipertensi</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Berikut adalah ringkasan hasil skrining Anda pada tanggal {screeningDate}.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* User Information */}
                        <div className="border p-4 rounded-lg bg-secondary/20">
                            <h4 className="font-semibold text-lg mb-2">Informasi Pengguna</h4>
                            <p><strong>Nama:</strong> {screeningHistory.user.name}</p>
                            <p><strong>ID Skrining:</strong> {screeningHistory.id}</p>
                        </div>

                        {/* Screening Result */}
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">Diagnosis Hasil Skrining</h4>
                            <p className="text-xl font-bold text-green-600">
                                {screeningHistory.screening_result}
                            </p>
                            {screeningHistory.risk_level && (
                                <div className="mt-4">
                                    <h5 className="font-semibold text-md mb-1">Tingkat Risiko:</h5>
                                    <Badge variant="outline" className={`text-md px-3 py-1 ${
                                        screeningHistory.risk_level.name === 'Tinggi' ? 'bg-red-100 text-red-700 border-red-300' :
                                        screeningHistory.risk_level.name === 'Sedang' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                                        'bg-green-100 text-green-700 border-green-300'
                                    }`}>
                                        {screeningHistory.risk_level.name}
                                    </Badge>
                                    <p className="mt-2 text-muted-foreground">{screeningHistory.risk_level.description}</p>
                                    <p className="mt-2"><strong>Saran:</strong> {screeningHistory.risk_level.suggestion}</p>
                                </div>
                            )}
                        </div>

                        {/* Risk Factors Answered */}
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">Faktor Risiko yang Dijawab</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {screeningHistory.risk_factors.map((factor) => (
                                    <li key={factor.id}>
                                        <strong>{factor.name}:</strong>{' '}
                                        <Badge variant={factor.pivot.answer ? "destructive" : "secondary"}>
                                            {factor.pivot.answer ? 'Ya' : 'Tidak'}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-center mt-6">
                            <Link href="/">
                                <Button>Kembali ke Beranda</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ClientLayout>
    );
}
