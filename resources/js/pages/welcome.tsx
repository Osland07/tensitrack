import { Head, usePage, Link } from '@inertiajs/react';
import React, { PropsWithChildren, useState, useRef, useCallback, useEffect } from 'react'; // Added useRef and useCallback
import { type SharedData } from '@/types';
import ClientLayout from '@/layouts/Client/ClientLayout';
import { Star, Cpu, Lock, ShieldCheck, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BmiCalculator from '@/components/BmiCalculator';
import RiskGauge from '@/components/RiskGauge';
import FaqSection from '@/components/FaqSection';
import ScreeningModal from '@/components/ScreeningModal'; // Added import
import ArticleCarousel from '@/components/ArticleCarousel';
import { useToast } from '@/components/ui/use-toast'; // For notifications

export default function Welcome({ canRegister = true }: { canRegister?: boolean; }) {
    const { auth } = usePage<SharedData>().props;
    const { toast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false); // Added state
    const bmiCalculatorRef = useRef<HTMLDivElement>(null); // Ref for BMI calculator section
    const [isBmiComplete, setIsBmiComplete] = useState(false); // New state to track if BMI is complete

    // Effect to check BMI status when component mounts or auth.user changes
    useEffect(() => {
        if (auth.user && auth.user.height && auth.user.weight && auth.user.bmi) {
            setIsBmiComplete(true);
        } else {
            setIsBmiComplete(false);
        }
    }, [auth.user]);

    const handleStartScreening = useCallback(() => {
        if (!auth.user) {
            toast({
                title: "Anda Belum Login",
                description: "Silakan login untuk memulai skrining risiko hipertensi.",
                variant: "destructive",
            });
            return;
        }

        // Only check for logged in users' BMI status
        if (!auth.user.height || !auth.user.weight || !auth.user.bmi) {
            toast({
                title: "Informasi BMI Belum Lengkap",
                description: "Silakan isi tinggi dan berat badan Anda pada kalkulator BMI di bawah untuk memulai skrining.",
                variant: "destructive",
            });
            if (bmiCalculatorRef.current) {
                bmiCalculatorRef.current.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        setIsModalOpen(true);
    }, [auth.user, toast]);

    return (
        <>
            <Head title="Selamat Datang" />

            {/* Modal */}
            <ScreeningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} currentUserBmi={auth.user?.bmi} />

            <main className="flex-1">
                <section id="beranda" className="pt-0 pb-4 md:pb-8 lg:pb-12">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)]">

                            {/* Image */}
                            <div className="order-last md:order-last flex justify-center h-full">
                                <img className="h-full w-full object-cover rounded-lg" src="/sipakar-home.png" alt="Gambar Home" />
                            </div>

                            {/* Text */}
                            <div className="flex flex-col justify-center px-3 sm:px-5">
                                <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold mb-3" style={{ backgroundColor: 'rgba(0, 27, 72, 0.1)', color: '#001B48' }}>
                                    <Star className="inline-block h-4 w-4 mr-1" /> Sistem Cerdas Deteksi Dini
                                </span>
                                <h1 className="text-start font-bold text-4xl md:text-5xl mb-3 text-primary">
                                    Ketahui Risiko Hipertensi <br />
                                    <span className="text-secondary">Sebelum Terlambat</span>
                                </h1>
                                <p className="lead text-muted-foreground mb-4 leading-relaxed">
                                    Hipertensi sering datang tanpa gejala.
                                    <b className="font-bold">TensiTrack</b> membantu Anda memprediksi potensi risiko di masa depan
                                    berdasarkan gaya hidup Anda saat ini.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Button size="lg" onClick={handleStartScreening}>
                                        Mulai Skrining Gratis
                                    </Button>
                                    <Button asChild variant="outline" size="lg">
                                        <Link href="#kalkulator-bmi">Kalkulator Berat Badan Ideal</Link>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="alur-interaksi" className="pt-0 pb-8 md:pb-16 lg:pb-24">
                    <div className="container mx-auto">
                        <div className="text-center">
                            <h2 className="text-center font-bold text-primary text-3xl md:text-4xl mb-2">Alur Interaksi Pengguna</h2>
                            <p className="text-primary mb-8">Ikuti langkah sederhana berikut untuk mulai menggunakan TensiTrack</p>
                            <img className="max-w-full h-auto mx-auto" src="/assets/img/Alur Kerja/alur-kerja.png" alt="Alur Interaksi Pengguna" />
                        </div>
                    </div>
                </section>

                <section id="kalkulator-bmi" className="py-12 bg-[#F4F7FB]">
                    <div className="container mx-auto">
                        {/* Section Title */}
                        <div className="flex justify-center text-center mb-12">
                            <div className="w-full lg:w-8/12">
                                <h2 className="font-bold text-3xl md:text-4xl mb-2 text-primary">Kalkulator Berat Badan Ideal</h2>
                                <p className="text-muted-foreground">
                                    Obesitas adalah salah satu faktor risiko utama Hipertensi. Cek apakah berat badan Anda sudah ideal?
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            {/* Kolom Kiri */}
                            <div className="col-span-1 lg:col-span-1">
                                <h4 className="font-bold text-secondary mb-3">Apa itu BMI?</h4>
                                <p className="text-muted-foreground mb-4">
                                    Body Mass Index (BMI) adalah cara menghitung berat badan ideal berdasarkan tinggi dan berat badan. BMI
                                    juga dapat dibedakan berdasarkan usia.
                                </p>
                                <h4 className="font-bold text-secondary mb-3">Apa itu kalkulator BMI?</h4>
                                <p className="text-muted-foreground mb-4">
                                    Kalkulator BMI adalah alat untuk mengidentifikasi apakah berat badan kamu termasuk dalam kategori
                                    ideal atau tidak. Kalkulator ini dapat digunakan oleh seseorang yang berusia 20 tahun ke atas.
                                </p>
                                <div className="text-center text-lg-start mt-4">
                                    <img src="https://img.freepik.com/premium-vector/weight-loss-bmi-man-woman-before-after-diet-fitness-fat-thin-man-woman_162329-342.jpg"
                                        alt="Ilustrasi BMI" className="max-w-full h-auto rounded shadow-sm" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                </div>
                            </div>

                            {/* Kolom Kanan: Kalkulator */}
                            <div className="col-span-1 lg:col-span-1" ref={bmiCalculatorRef}>
                                <BmiCalculator />
                            </div>
                        </div>
                    </div>
                </section>

                <section id="diagnosis" className="py-20 sm:py-32">
                    <div className="container mx-auto px-4">
                        <div className="relative isolate overflow-hidden bg-primary shadow-2xl rounded-3xl">
                            {/* Background Glow Effect */}
                            <div className="absolute -top-40 -right-40 w-[50rem] h-[50rem] bg-secondary/20 rounded-full blur-[12rem]"></div>
                            
                            <div className="relative z-10 max-w-2xl mx-auto text-center p-12 lg:p-20">
                                <div
                                    className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-4 border border-secondary/20">
                                    <ShieldCheck className="inline h-4 w-4 mr-1.5" /> PENCEGAHAN DINI
                                </div>
                                <h2 className="font-bold text-3xl text-white sm:text-4xl md:text-5xl">
                                    Jangan Tunggu Sakit, Deteksi Dini Sekarang.
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-white/70">
                                    Hipertensi dijuluki <i>"The Silent Killer"</i> karena sering muncul tanpa gejala. Sistem pakar <b>TensiTrack</b> membantu Anda mengenali sinyal bahaya sebelum terlambat.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Button variant="secondary" size="lg" className="text-lg font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform duration-300" onClick={handleStartScreening}>
                                        Mulai Skrining
                                        <ArrowRight className="inline h-5 w-5 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="artikel-terbaru" className="py-12">
                    <div className="container mx-auto">
                        <div className="flex justify-center text-center mb-12">
                            <div className="w-full lg:w-8/12">
                                <h2 className="font-bold text-3xl md:text-4xl mb-2 text-primary">Artikel Terbaru</h2>
                                <p className="text-muted-foreground">
                                    Baca artikel terbaru seputar hipertensi, gaya hidup sehat, dan tips menjaga tekanan darah.
                                </p>
                            </div>
                        </div>
                        <ArticleCarousel />
                    </div>
                </section>

                <section id="faq" className="pt-12 bg-white relative overflow-hidden">
                    <div className="container mx-auto pt-8">
                        <div className="text-center mb-12">
                            <h2 className="font-bold text-primary text-3xl md:text-4xl">Pertanyaan Umum</h2>
                            <p className="text-muted-foreground">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
                        </div>
                        <FaqSection />
                    </div>
                </section>
            </main>
        </>
    );
}

// Assign the layout
Welcome.layout = (page: React.ReactElement<PropsWithChildren<{ title?: string, canRegister?: boolean }>>) => {
    const { title, canRegister } = page.props;
    return <ClientLayout title={title} canRegister={canRegister} children={page} />;
};