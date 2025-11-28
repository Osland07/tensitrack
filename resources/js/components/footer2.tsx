// resources/js/components/footer2.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo, LogoImage, LogoText } from "@/components/logo";

const Footer2 = () => {
    return (
        <section className="bg-[#011a41] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <footer className="w-full">
                    <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-12">
                        
                        {/* Kolom Kiri (Deskripsi Brand) */}
                        <div className="col-span-2 lg:col-span-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Logo url="/">
                                    <LogoImage
                                        src="/logo-tensitrack.png" 
                                        alt="TensiTrack Logo"
                                        title="TensiTrack"
                                        className="h-9"
                                    />
                                    <LogoText className="text-2xl font-bold text-white">TensiTrack</LogoText>
                                </Logo>
                            </div>
                            <p className="text-gray-300 text-base">
                                Sistem cerdas untuk deteksi dini risiko hipertensi, membantu Anda menjaga kesehatan masa depan.
                            </p>
                        </div>

                        {/* Kolom Tautan */}
                        <div className="col-span-1 lg:col-span-2">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">Tautan</h3>
                            <ul className="space-y-3">
                                <li><Link href="#beranda" className="text-base text-gray-300 hover:text-white">Beranda</Link></li>
                                <li><Link href="#alur-interaksi" className="text-base text-gray-300 hover:text-white">Alur Kerja</Link></li>
                                <li><Link href="#faq" className="text-base text-gray-300 hover:text-white">FAQ</Link></li>
                            </ul>
                        </div>

                        {/* Kolom Layanan */}
                        <div className="col-span-1 lg:col-span-2">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">Layanan</h3>
                            <ul className="space-y-3">
                                <li><Link href="#kalkulator-bmi" className="text-base text-gray-300 hover:text-white">Kalkulator BMI</Link></li>
                                <li><Link href="#diagnosis" className="text-base text-gray-300 hover:text-white">Skrining Risiko</Link></li>
                            </ul>
                        </div>

                        {/* Kolom Kontak */}
                        <div className="col-span-2 lg:col-span-4">
                            <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase mb-4">Kontak</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 mt-0.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-base text-gray-300">dukungan@tensitrack.com</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 mt-0.5 text-gray-400 flex-shrink-0" />
                                    <span className="text-base text-gray-300">(021) 123-4567</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                        <p className="text-sm text-gray-500">
                            © 2025 TensiTrack • All rights reserved
                        </p>
                    </div>
                </footer>
            </div>
        </section>
    );
};

export { Footer2 };