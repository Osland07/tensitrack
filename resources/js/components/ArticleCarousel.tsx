import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from '@inertiajs/react';



export default function ArticleCarousel() {


  return (
    <div className="relative">
      <Carousel
        opts={{
            align: "start",
            loop: true,
        }}
        className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
      >
        <CarouselContent>
            {[
                {
                    category: 'Wawasan',
                    title: 'Masalah Hipertensi di Indonesia, Mengapa Deteksi Dini dan Aturan Konsumsi Garam Itu Penting?',
                    description: 'Mengupas pentingnya deteksi dini dan regulasi asupan garam dalam menanggulangi masalah hipertensi yang meluas di Indonesia.',
                    imageUrl: 'https://images.pexels.com/photos/5945763/pexels-photo-5945763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    url: 'https://voi.id/kesehatan/462260/masalah-hipertensi-di-indonesia-mengapa-deteksi-dini-dan-aturan-konsumsi-garam-itu-penting#google_vignette',
                },
                {
                    category: 'Pencegahan',
                    title: 'Bahaya Hipertensi, Upaya Pencegahan dan Pengendalian Hipertensi',
                    description: 'Artikel resmi dari Kemenkes yang menjelaskan bahaya, serta langkah-langkah pencegahan dan pengendalian hipertensi.',
                    imageUrl: 'https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    url: 'https://kemkes.go.id/id/bahaya-hipertensi-upaya-pencegahan-dan-pengendalian-hipertensi',
                },
                {
                    category: 'Nutrisi',
                    title: 'Penerapan Dietary Approach to Stop Hypertension (DASH)',
                    description: 'Panduan praktis dari Kemenkes mengenai penerapan diet DASH sebagai salah satu cara efektif untuk melawan hipertensi.',
                    imageUrl: 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    url: 'https://keslan.kemkes.go.id/view_artikel/2681/penerapan-dietary-approach-to-stop-hypertension-dash',
                },
                {
                    category: 'Faktor Risiko',
                    title: '9 Faktor Risiko Hipertensi yang Perlu Diwaspadai',
                    description: 'Kenali 9 faktor risiko utama yang dapat memicu hipertensi agar Anda dapat mengambil langkah antisipasi sejak dini.',
                    imageUrl: 'https://images.pexels.com/photos/7108339/pexels-photo-7108339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    url: 'https://www.kompas.com/tren/read/2023/03/31/073000465/9-faktor-risiko-hipertensi-yang-perlu-diwaspadai',
                },
                {
                    category: 'Olahraga',
                    title: 'Olahraga untuk Hipertensi: Panduan Lengkap Menurut WHO & Kemenkes RI',
                    description: 'Panduan lengkap dan aman untuk melakukan olahraga bagi penderita hipertensi, sesuai rekomendasi WHO dan Kemenkes.',
                    imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    url: 'https://www.indonesian-publichealth.com/olahraga-untuk-hipertensi-panduan-lengkap-menurut-who-kemenkes-ri-aman-efektif/',
                },
            ].map((article, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
                            </a>
                            <div className="p-6 flex flex-col flex-grow">
                                <p className="text-sm font-semibold text-secondary mb-2">{article.category}</p>
                                <h3 className="text-xl font-bold text-primary mb-3 leading-snug flex-grow">{article.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">{article.description}</p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-secondary transition-colors duration-300 self-start mt-auto">
                                    Baca Selengkapnya &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}