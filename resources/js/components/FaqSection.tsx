import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
    {
        question: 'Apakah hasil skrining risiko hipertensi pada TensiTrack dapat menggantikan pemeriksaan dokter?',
        answer: 'Tidak. TensiTrack hanya membantu memberikan indikasi awal terhadap risiko hipertensi, dan hasilnya tidak menggantikan diagnosis medis dari dokter.',
    },
    {
        question: 'Bagaimana cara kerja TensiTrack dalam melakukan skrining risiko hipertensi?',
        answer: 'Sistem TensiTrack menggunakan metode forward chaining untuk menganalisis data pengguna dan menentukan potensi risiko hipertensi berdasarkan faktor-faktor kesehatan tertentu.',
    },
    {
        question: 'Apakah kalkulator BMI dapat digunakan oleh seluruh kelompok masyarakat?',
        answer: 'Ya, kalkulator BMI dapat digunakan oleh siapa saja, tetapi hasilnya perlu disesuaikan dengan kondisi individu seperti usia dan massa otot.',
    },
    {
        question: 'Apakah data kesehatan saya aman?',
        answer: 'TensiTrack menerapkan sistem keamanan data dengan enkripsi agar informasi pribadi pengguna tetap terlindungi.',
    },
    {
        question: 'Apakah skrining risiko hipertensi dapat dilakukan secara berkala?',
        answer: 'Ya, pengguna disarankan melakukan skrining secara berkala untuk memantau perubahan risiko dan menjaga kesehatan secara berkelanjutan.',
    },
];

const FaqSection = () => {
    return (
        <div className="w-full max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg text-left font-semibold">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default FaqSection;