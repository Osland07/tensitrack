import React, { useState } from 'react';
import ClientLayout from '@/layouts/Client/ClientLayout';
import { store } from '@/actions/App/Http/Controllers/Client/ClientScreeningController';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Define types for data passed from backend
type RiskFactor = {
    id: number;
    name: string;
    description: string;
    score: number; // Score might be used for calculations
    order: number;
};

type RiskLevel = {
    id: number;
    name: string;
    description: string;
    suggestion: string;
};

interface ScreeningProps {
    riskFactors: RiskFactor[];
    riskLevels: RiskLevel[]; // Passed from controller for potential frontend use or context
}

interface Answer {
    risk_factor_id: number;
    answer: boolean; // true for 'Ya', false for 'Tidak'
}

export default function ScreeningIndex({ riskFactors, riskLevels }: ScreeningProps) {
    const [currentStep, setCurrentStep] = useState<'questions' | 'confirmation'>('questions');

    const { data, setData, post, processing, errors, wasSuccessful, recentlySuccessful } = useForm<{
        weight: string;
        height: string;
        answers: Answer[];
    }>({
        weight: '',
        height: '',
        answers: riskFactors.map(factor => ({ risk_factor_id: factor.id, answer: false })), // Initialize all to false
    });

    const handleProceedToConfirmation = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.weight || !data.height) {
            alert("Validasi Gagal: Berat badan dan tinggi badan harus diisi.");
            return;
        }

        // Check if all questions have been answered (assuming 'false' is a valid initial answer)
        // If an answer is explicitly 'true' or 'false', it's considered answered.
        // We ensure all risk factors have an entry in data.answers
        const allQuestionsAnswered = riskFactors.every(factor =>
            data.answers.some(ans => ans.risk_factor_id === factor.id)
        );

        if (!allQuestionsAnswered) {
            alert("Validasi Gagal: Harap jawab semua pertanyaan risiko.");
            return;
        }

        setCurrentStep('confirmation');
    };

    const handleConfirmAndSubmit = (e: React.FormEvent) => {
        e.preventDefault();
                    post(store().url, {            onSuccess: () => {
                alert("Skrining Anda telah berhasil disimpan!");
            },
            onError: (formErrors) => {
                const errorMessage = Object.values(formErrors).flat().join(', ');
                alert(errorMessage || "Terjadi kesalahan saat menyimpan skrining.");
            }
        });
    };

    const handleAnswerChange = (factorId: number, value: boolean) => {
        setData('answers', data.answers.map(ans =>
            ans.risk_factor_id === factorId ? { ...ans, answer: value } : ans
        ));
    };

    return (
        <ClientLayout>
            <Head title="Skrining Hipertensi" />
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">Skrining Deteksi Dini Hipertensi</CardTitle>
                        <p className="text-muted-foreground">Isi formulir di bawah ini untuk mengetahui potensi risiko hipertensi Anda.</p>
                    </CardHeader>
                    <CardContent>
                        {currentStep === 'questions' && (
                            <form onSubmit={handleProceedToConfirmation} className="space-y-6">
                                {/* Personal Data Section (Weight, Height) */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-primary">Data Personal</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="weight">Berat Badan (kg)</Label>
                                            <Input
                                                id="weight"
                                                type="number"
                                                step="0.1"
                                                value={data.weight}
                                                onChange={(e) => setData('weight', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                            <InputError message={errors.weight} className="mt-2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="height">Tinggi Badan (cm)</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                step="0.1"
                                                value={data.height}
                                                onChange={(e) => setData('height', e.target.value)}
                                                required
                                                className="mt-1"
                                            />
                                            <InputError message={errors.height} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Factors Section */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-primary">Faktor Risiko Hipertensi</h3>
                                    <p className="text-muted-foreground">Jawab pertanyaan berikut sesuai kondisi Anda:</p>
                                    {riskFactors.map((factor) => {
                                        const currentAnswer = data.answers.find(ans => ans.risk_factor_id === factor.id)?.answer;
                                        return (
                                            <div key={factor.id} className="border p-4 rounded-lg">
                                                <Label className="text-lg font-medium mb-2 block">{factor.name}</Label>
                                                <RadioGroup
                                                    value={currentAnswer !== undefined ? (currentAnswer ? 'true' : 'false') : undefined}
                                                    onValueChange={(value) => handleAnswerChange(factor.id, value === 'true')}
                                                    className="flex space-x-4 mt-2"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="true" id={`factor-${factor.id}-yes`} />
                                                        <Label htmlFor={`factor-${factor.id}-yes`}>Ya</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="false" id={`factor-${factor.id}-no`} />
                                                        <Label htmlFor={`factor-${factor.id}-no`}>Tidak</Label>
                                                    </div>
                                                </RadioGroup>
                                                <InputError message={errors[`answers.${factor.id}.answer`]} className="mt-2" />
                                            </div>
                                        );
                                    })}
                                </div>

                                <Button type="submit" className="w-full">
                                    Lanjutkan ke Konfirmasi
                                </Button>
                            </form>
                        )}

                        {currentStep === 'confirmation' && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Konfirmasi Skrining</h3>
                                <p className="text-muted-foreground">Harap periksa kembali jawaban Anda sebelum mengirimkan skrining.</p>

                                {/* Summary of answers */}
                                <div className="space-y-4 border p-4 rounded-lg">
                                    <h4 className="font-semibold">Data Personal:</h4>
                                    <p><strong>Berat Badan:</strong> {data.weight} kg</p>
                                    <p><strong>Tinggi Badan:</strong> {data.height} cm</p>

                                    <h4 className="font-semibold mt-4">Faktor Risiko:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {riskFactors.map((factor) => {
                                            const answer = data.answers.find(ans => ans.risk_factor_id === factor.id)?.answer;
                                            return (
                                                <li key={factor.id}>
                                                    <strong>{factor.name}:</strong> {answer ? 'Ya' : 'Tidak'}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setCurrentStep('questions')}
                                        className="w-full md:w-auto"
                                    >
                                        Kembali
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleConfirmAndSubmit}
                                        disabled={processing}
                                        className="w-full md:w-auto"
                                    >
                                        {processing ? 'Memproses...' : 'Konfirmasi & Selesai'}
                                    </Button>
                                </div>
                                {errors && Object.keys(errors).length > 0 && (
                                    <div className="text-sm text-red-500 mt-2">
                                        <p>Terjadi kesalahan saat mengirimkan skrining:</p>
                                        <ul>
                                            {Object.values(errors).flat().map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </ClientLayout>
    );
}