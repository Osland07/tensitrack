import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { FileText, Cpu, CheckCircle, Brain, BookOpenText, Lightbulb, ArrowRight } from 'lucide-react';

export default function RulesIndex() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Rules' }]}>
            <Head title="Rules" />
            <div className="container-admin space-y-8">
                <div className="card p-6 md:p-8 space-y-6">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] p-4 sm:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 leading-tight">
                                TensiTrack: Deteksi Dini, Hidup Sehat
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                                Memahami bagaimana "detektif" kesehatan pribadi Anda bekerja
                                untuk melindungi Anda dari risiko hipertensi.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-10"> {/* Added mb-10 */}
                            {/* Kartu 1: Basis Pengetahuan */}
                            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                                <BookOpenText className="h-16 w-16 text-blue-600 mb-4" />
                                <h3 className="text-xl font-bold text-blue-800 mb-2">Pilar 1: Pengetahuan Ahli</h3>
                                <p className="text-blue-700 text-sm">
                                    Berisi ribuan "aturan emas" dan fakta medis dari para ahli untuk mendeteksi risiko Anda.
                                </p>
                            </div>

                            {/* Kartu 2: Otak Cerdas Sistem */}
                            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                                <Brain className="h-16 w-16 text-green-600 mb-4" />
                                <h3 className="text-xl font-bold text-green-800 mb-2">Pilar 2: Kecerdasan Analisis</h3>
                                <p className="text-green-700 text-sm">
                                    Menganalisis jawaban Anda, mencocokkan pola, dan menyimpulkan potensi risiko dengan cepat.
                                </p>
                            </div>

                            {/* Kartu 3: Wawasan & Rekomendasi */}
                            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                                <Lightbulb className="h-16 w-16 text-purple-600 mb-4" />
                                <h3 className="text-xl font-bold text-purple-800 mb-2">Pilar 3: Wawasan Personal</h3>
                                <p className="text-purple-700 text-sm">
                                    Memberikan laporan risiko yang jelas serta saran khusus untuk menjaga kesehatan jantung Anda.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 text-center max-w-3xl mx-auto mb-10"> {/* Added mb-10 */}
                            <h3 className="text-2xl font-bold text-primary mb-4">Simulasi Singkat: Bagaimana TensiTrack Bekerja?</h3>
                            <p className="text-muted-foreground text-base mb-4">
                                Bayangkan ini: Anda menjawab "Ya" untuk "Apakah Anda memiliki riwayat keluarga hipertensi?".
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 bg-gray-50 p-6 rounded-lg shadow-inner">
                                <div className="text-lg font-semibold text-gray-800 flex items-center">
                                    <span className="text-primary text-3xl font-bold mr-2">JIKA</span> Riwayat Keluarga Hipertensi "Ya"
                                </div>
                                <ArrowRight className="h-8 w-8 text-secondary flex-shrink-0" /> {/* ArrowRight from lucide-react */}
                                <div className="text-lg font-semibold text-gray-800 flex items-center">
                                    <span className="text-primary text-3xl font-bold mr-2">MAKA</span> Risiko Meningkat (+X Poin)
                                </div>
                            </div>
                            <p className="text-muted-foreground text-base mt-4">
                                Sistem akan mengumpulkan semua "JIKA" dari jawaban Anda dan memberikan "MAKA" yang relevan.
                            </p>
                        </div>

                        <div className="text-center max-w-3xl mx-auto">
                            <h3 className="text-2xl font-bold text-primary mb-4">Contoh Aturan yang Berlaku di Sistem</h3>
                            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg text-left text-sm space-y-2">
                                <p className="font-semibold text-orange-800">Aturan 1 (Pola Makan):</p>
                                <p className="text-orange-700">
                                    <strong>JIKA</strong> asupan garam tinggi (sering makan makanan olahan/cepat saji) <br />
                                    <strong>DAN</strong> jarang mengonsumsi sayur & buah <br />
                                    <strong>MAKA</strong> meningkatkan risiko hipertensi level A.
                                </p>
                                <p className="font-semibold text-orange-800">Aturan 2 (Gaya Hidup):</p>
                                <p className="text-orange-700">
                                    <strong>JIKA</strong> aktivitas fisik rendah (kurang dari 30 menit/hari, 3x/minggu) <br />
                                    <strong>DAN</strong> memiliki indeks massa tubuh (BMI) &gt; 25 (overweight/obesitas) <br />
                                    <strong>MAKA</strong> meningkatkan risiko hipertensi level B.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}