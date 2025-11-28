@extends('layouts.user.app')
@section('content')
    {{-- Koding 1: BERANDA --}}
    <div id="beranda" class="section">
        <div class="container">
            <div class="row min-vh-100 min-vh-u-lg-85 align-items-start">

                <!-- Gambar -->
                <div class="col-12 col-lg-6 hero-fit-vertical order-lg-2" data-aos="fade-right" id="container-image-hero">
                    <img class="img-fluid bg-body-tertiary rounded" id="sipakar-home"
                        src="{{ asset('assets/img/sipakar-home.png') }}" width="773" height="742" alt="Gambar Home">
                </div>

                <!-- Teks Baru -->
                <div class="col-12 col-lg-6 align-self-center px-3 px-sm-5 order-lg-1" data-aos="fade-left">

                    <span class="badge rounded-pill px-3 py-2 mb-3"
                        style="background-color: rgba(0, 27, 72, 0.1); color: #001B48; font-weight: 600;">
                        <i class="bi bi-stars me-1"></i> Sistem Cerdas Deteksi Dini
                    </span>

                    <h1 class="text-start fw-bold display-5 mb-3" style="color: #001B48;">
                        Ketahui Risiko Hipertensi <br>
                        <span class="text-warning">Sebelum Terlambat</span>
                    </h1>

                    <p class="lead text-secondary mb-4" style="line-height: 1.8;">
                        Hipertensi sering datang tanpa gejala.
                        <b>TensiTrack</b> membantu Anda memprediksi potensi risiko di masa depan
                        berdasarkan gaya hidup Anda saat ini.
                    </p>

                    <div class="d-flex flex-wrap gap-3">
                        <a href="#diagnosis" class="btn text-white px-4 py-3 shadow-sm rounded-pill fw-bold"
                            style="background-color: #001B48;">
                            Mulai Skrining Gratis
                        </a>

                        <a href="#kalkulator-bmi" class="btn btn-outline-dark px-4 py-3 rounded-pill fw-bold">
                            Cek BMI Dulu
                        </a>
                    </div>

                </div>

            </div>
        </div>
    </div>


    {{-- BAGIAN 2: ALUR INTERAKSI --}}
    <div id="alur-interaksi" class="section">
        <div class="container">
            <div class="text-center" data-aos="fade-up">
                <h1 class="text-center font-bold " style="color: #001B48;">Alur Interaksi Pengguna</h1>
                <p style="color: #001B48;">Ikuti langkah sederhana berikut untuk mulai menggunakan TensiTrack</p>
                <img class="img-fluid" src="{{ asset('assets/img/Alur Kerja/alur-kerja.png') }}"
                    alt="Alur Interaksi Pengguna">
            </div>
        </div>
    </div>

    <!-- SECTION 1: Judul & Deskripsi -->
    <div id="kalkulator-bmi-intro" class="section pt-5 pb-2" style="background-color: #F4F7FB;">
        <div class="container py-2">
            <div class="row justify-content-center text-center mb-2" data-aos="fade-up">
                <div class="col-lg-8">
                    <h2 class="fw-bold mb-2" style="color: #001B48;">Kalkulator Berat Badan Ideal</h2>
                    <p class="text-muted">
                        Obesitas adalah salah satu faktor risiko utama Hipertensi. Cek apakah berat badan Anda sudah ideal?
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 2: Penjelasan & Kalkulator -->
    <div id="kalkulator-bmi" class="section py-3">
        <div class="container">
            <div class="row align-items-center">

                <!-- Kolom Kiri -->
                <div class="col-12 col-lg-6 mb-4 mb-lg-0" data-aos="fade-right">
                    <h4 class="fw-bold mb-3" style="color: #f59e0b;">Apa itu BMI?</h4>
                    <p class="text-muted mb-4">
                        Body Mass Index (BMI) adalah cara menghitung berat badan ideal berdasarkan tinggi dan berat badan. BMI
                        juga dapat dibedakan berdasarkan usia.
                    </p>

                    <h4 class="fw-bold mb-3" style="color: #f59e0b;">Apa itu kalkulator BMI?</h4>
                    <p class="text-muted mb-4">
                        Kalkulator BMI adalah alat untuk mengidentifikasi apakah berat badan kamu termasuk dalam kategori
                        ideal atau tidak. Kalkulator ini dapat digunakan oleh seseorang yang berusia 20 tahun ke atas.
                    </p>

                    <div class="text-center text-lg-start mt-4">
                        <img src="https://img.freepik.com/premium-vector/weight-loss-bmi-man-woman-before-after-diet-fitness-fat-thin-man-woman_162329-342.jpg"
                            alt="Ilustrasi BMI" class="img-fluid rounded shadow-sm"
                            style="max-height: 300px; object-fit: contain;">
                    </div>
                </div>

                <!-- Kolom Kanan: Kalkulator -->
                <div class="col-12 col-lg-6" data-aos="fade-left">
                    <div class="card border-0 shadow-lg p-4" style="background-color: #001B48; border-radius: 15px;">
                        <div class="card-body text-white">

                            <!-- Radio Gender -->
                            <div class="d-flex justify-content-center gap-4 mb-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="genderLaki"
                                        value="male" checked>
                                    <label class="form-check-label" for="genderLaki">Laki-Laki</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="gender" id="genderPerempuan"
                                        value="female">
                                    <label class="form-check-label" for="genderPerempuan">Perempuan</label>
                                </div>
                            </div>

                            <!-- Input Tinggi -->
                            <div class="mb-3">
                                <label for="height" class="form-label fw-bold" style="color: #f59e0b;">Tinggi Badan
                                    (cm)</label>
                                <input type="number" class="form-control p-3" id="height"
                                    placeholder="Masukkan tinggi badan..." style="border-radius: 10px;">
                            </div>

                            <!-- Input Berat -->
                            <div class="mb-4">
                                <label for="weight" class="form-label fw-bold" style="color: #f59e0b;">Berat Badan
                                    (kg)</label>
                                <input type="number" class="form-control p-3" id="weight"
                                    placeholder="Masukkan berat badan..." style="border-radius: 10px;">
                            </div>

                            <!-- Tombol Hitung -->
                            <div class="d-grid gap-2 mb-4">
                                <button type="button" onclick="calculateBMI()" class="btn btn-light fw-bold py-3"
                                    style="color: #001B48; border-radius: 10px;">
                                    Menghitung BMI
                                </button>
                            </div>

                            <!-- Hasil -->
                            <div class="mb-2">
                                <label for="result" class="form-label fw-bold" style="color: #f59e0b;">Hasil</label>
                                <input type="text" class="form-control p-3 fw-bold text-center" id="result" readonly
                                    style="border-radius: 10px; background-color: #fff;" placeholder="-">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


    {{-- BAGIAN 4: SKRINING RISIKO (REDESIGNED & ANIMATED) --}}
    <div id="diagnosis" class="section py-5 position-relative bg-white">
        {{-- Background Ornament --}}
        <div
            style="position: absolute; right: 0; bottom: 0; width: 400px; height: 400px; background: radial-gradient(circle, rgba(0,27,72,0.03) 0%, rgba(255,255,255,0) 70%); z-index: 0;">
        </div>

        {{-- Internal Style untuk Animasi Speedometer & Arc --}}
        <style>
            /* 1. Animasi Jarum (Needle): Menyapu dari Kiri (Hijau) ke Kanan (Merah) lalu kembali */
            @keyframes gaugeIntro {
                0% {
                    transform: rotate(-90deg);
                }

                /* Mulai: Zona Hijau */
                50% {
                    transform: rotate(90deg);
                }

                /* Sampai: Zona Merah */
                100% {
                    transform: rotate(0deg);
                }

                /* Selesai: Tengah (Zona Kuning/Siaga) */
            }

            .gauge-needle-anim {
                animation: gaugeIntro 3s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                transform-origin: bottom center;
                transform: rotate(-90deg);
                /* Posisi awal */
            }

            /* 2. Animasi Denyut Halus pada Gauge */
            @keyframes pulseScale {

                0%,
                100% {
                    transform: scale(1);
                    opacity: 0.9;
                }

                50% {
                    transform: scale(1.02);
                    opacity: 1;
                }
            }

            .gauge-multicolor {
                /* Membuat 3 Zona Warna: Hijau (Aman), Kuning (Waspada), Merah (Bahaya) */
                background: conic-gradient(from 270deg,
                        #22c55e 0deg 60deg,
                        /* Hijau: 0-60 derajat */
                        #eab308 60deg 120deg,
                        /* Kuning: 60-120 derajat */
                        #ef4444 120deg 180deg
                        /* Merah: 120-180 derajat */
                    );
                /* Masking tengahnya agar bolong (seperti donat/busur) */
                -webkit-mask-image: radial-gradient(closest-side, transparent 70%, black 71%);
                mask-image: radial-gradient(closest-side, transparent 70%, black 71%);

                animation: pulseScale 3s ease-in-out infinite;
            }
        </style>

        <div class="container py-5 position-relative z-1">
            <div class="row align-items-center">
                {{-- Kolom Kiri: Visual Card yang Lebih Interaktif --}}
                <div class="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
                    <div class="card border-0 shadow-lg rounded-4 text-white overflow-hidden"
                        style="background: linear-gradient(135deg, #001B48 0%, #003580 100%); min-height: 520px;">

                        {{-- Header Card --}}
                        <div
                            class="p-4 border-bottom border-white border-opacity-10 d-flex justify-content-between align-items-center bg-black bg-opacity-10">
                            <div class="d-flex align-items-center">

                            </div>
                            <i class="bi bi-cpu text-white-50"></i>
                        </div>

                        {{-- Body Card --}}
                        <div
                            class="card-body d-flex flex-column justify-content-center align-items-center text-center p-5 position-relative">

                            {{-- Visual Speedometer/Gauge Effect (Multicolor) --}}
                            <div class="position-relative mb-4" style="width: 220px; height: 110px; overflow: hidden;">
                                {{-- Gauge Arc (3 Warna) --}}
                                <div class="gauge-multicolor" style="width: 220px; height: 220px; border-radius: 50%;">
                                </div>

                                {{-- Animated Needle --}}
                                <div class="gauge-needle-anim"
                                    style="position: absolute; bottom: 0; left: 50%; width: 4px; height: 95px; background: white; border-radius: 2px; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-left: -2px; z-index: 2;">
                                </div>

                                {{-- Center Dot --}}
                                <div
                                    style="position: absolute; bottom: -10px; left: 50%; width: 24px; height: 24px; background: white; border-radius: 50%; transform: translate(-50%, 0); z-index: 3; border: 4px solid #001B48;">
                                </div>

                                {{-- Label Text (Opsional) --}}
                                <div class="d-flex justify-content-between w-100 position-absolute px-2"
                                    style="bottom: 5px; font-size: 0.65rem; font-weight: bold; color: rgba(255,255,255,0.7);">
                                    <span>AMAN</span>
                                    <span style="margin-left: 10px;">WASPADA</span>
                                    <span>BAHAYA</span>
                                </div>
                            </div>

                            <h3 class="fw-bold mb-2">Analisis Risiko</h3>
                            <p class="text-white-50 mb-4 px-3 small">
                                Teknologi kami memproses data gaya hidup Anda untuk memetakan posisi risiko kesehatan Anda.
                            </p>


                            {{-- Stats / Features Floating --}}
                            <div class="row g-2 w-100">
                                <div class="col-6">
                                    <div
                                        class="bg-white bg-opacity-10 p-3 rounded-3 text-start border border-white border-opacity-10 h-100">
                                        <i class="bi bi-clipboard-pulse text-success mb-2 d-block fs-4"></i>
                                        <small class="d-block opacity-75" style="font-size: 0.7rem;">PARAMETER</small>
                                        <strong class="small">Hasil pengukuran tekanan darah</strong>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div
                                        class="bg-white bg-opacity-10 p-3 rounded-3 text-start border border-white border-opacity-10 h-100">
                                        <i class="bi bi-person-walking text-warning mb-2 d-block fs-4"></i>
                                        <small class="d-block opacity-75" style="font-size: 0.7rem;">PARAMETER</small>
                                        <strong class="small">Riwayat keluarga & gaya hidup</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- Footer Card --}}
                        <div class="px-4 py-3 bg-black bg-opacity-25 text-center">
                            <small class="text-white-50 fst-italic"><i class="bi bi-lock-fill me-1"></i> Data Anda
                                dienkripsi & aman</small>
                        </div>
                    </div>
                </div>

                {{-- Kolom Kanan: Typography & CTA yang Kuat --}}
                <div class="col-lg-6 offset-lg-1" data-aos="fade-left">
                    <div
                        class="d-inline-block px-3 py-1 rounded-pill bg-warning bg-opacity-10 text-warning fw-bold small mb-3 border border-warning border-opacity-25">
                        <i class="bi bi-shield-check me-1"></i> PENCEGAHAN DINI
                    </div>
                    <h1 class="fw-bold mb-4 display-5" style="color: #001B48;">
                        Jangan Tunggu Sakit. <br>
                        <span class="text-transparent bg-clip-text"
                            style="background-image: linear-gradient(90deg, #001B48, #2563eb); -webkit-background-clip: text; color: transparent; background-clip: text;">Deteksi
                            Dini Sekarang.</span>
                    </h1>
                    <p class="lead text-muted mb-4" style="font-size: 1.1rem;">
                        Hipertensi dijuluki <i>"The Silent Killer"</i> karena sering muncul tanpa gejala.
                        Sistem pakar <b>TensiTrack</b> membantu Anda mengenali sinyal bahaya sebelum terlambat.
                    </p>

                    <div class="d-flex flex-column gap-3 mb-5">
                        <div class="d-flex align-items-center p-3 rounded-3 shadow-sm bg-light">
                            <div class="me-3 text-primary"><i class="bi bi-check-circle-fill fs-4"></i></div>
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Identifikasi Risiko Tersembun</h6>
                                <small class="text-muted">Menemukan potensi hipertensi yang sering tidak disadar</small>
                            </div>
                        </div>
                        <div class="d-flex align-items-center p-3 rounded-3 shadow-sm bg-light">
                            <div class="me-3 text-primary"><i class="bi bi-file-medical-fill fs-4"></i></div>
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Rekomendasi Pencegahan</h6>
                                <small class="text-muted">Dapatkan saran gaya hidup yang dapat anda terapkan</small>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex flex-wrap gap-3 align-items-center">
                        <button id="btn-diagnosis" class="btn btn-lg text-white shadow px-5 py-3 rounded-pill fw-bold"
                            style="background: #001B48; transition: all 0.3s ease;">
                            Mulai Skrining Gratis <i class="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


        {{-- BAGIAN 7: ARTIKEL KESEHATAN TERKINI (BARU) --}}
    <div id="artikel" class="section py-5 bg-light position-relative">
        <div class="container py-4">
            {{-- Judul Section --}}
            <div class="text-center mb-5" data-aos="fade-up">
                <h2 class="fw-bold" style="color: #001B48;">Artikel Kesehatan Terkini</h2>
                <div style="width: 60px; height: 4px; background-color: #f59e0b; margin: 10px auto; border-radius: 2px;">
                </div>
                <p class="text-muted">Informasi terbaru seputar hipertensi dan gaya hidup sehat</p>
            </div>

            {{-- Wrapper Carousel --}}
            <div class="position-relative" data-aos="fade-up">

                {{-- Tombol Navigasi Kiri --}}
                <button
                    class="btn btn-light shadow-sm position-absolute start-0 top-50 translate-middle-y rounded-circle d-flex align-items-center justify-content-center border-warning z-2"
                    id="btnPrevArticle"
                    style="width: 50px; height: 50px; margin-left: -25px; border: 1px solid #f59e0b; color: #f59e0b; background-color: #001B48;">
                    {{-- Ganti icon font dengan SVG langsung agar pasti muncul --}}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>

                {{-- Container Artikel (Scrollable) --}}
                <div id="articleContainer" class="d-flex gap-4 overflow-hidden py-3"
                    style="scroll-behavior: smooth; scroll-snap-type: x mandatory;">

                    {{-- ARTIKEL 1 --}}
                    <div class="card border-warning border-opacity-50 shadow-sm flex-shrink-0 article-card"
                        style="width: 100%; max-width: 350px; scroll-snap-align: center; border-radius: 12px;">
                        <div class="overflow-hidden"
                            style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                class="card-img-top article-img" alt="Dokter Hipertensi"
                                style="height: 200px; object-fit: cover; transition: transform 0.3s;">
                        </div>
                        <div class="card-body d-flex flex-column text-center p-4">
                            <h5 class="card-title fw-bold fs-6 mb-3" style="color: #001B48; min-height: 4.5rem;">
                                Masalah Hipertensi di Indonesia, Mengapa Deteksi Dini Penting?
                            </h5>
                            <p class="card-text text-muted small mb-4 line-clamp-3">
                                Masalah hipertensi masih menjadi perhatian serius di Indonesia, seiring tingginya angka
                                penderita yang belum terdiagnosis.
                            </p>
                            <a href="https://voi.id/kesehatan/462260/masalah-hipertensi-di-indonesia-mengapa-deteksi-dini-dan-aturan-konsumsi-garam-itu-penting#google_vignette"
                                target="_blank" class="mt-auto text-decoration-underline fw-semibold"
                                style="color: #001B48;">
                                Baca selengkapnya
                            </a>
                        </div>
                    </div>

                    {{-- ARTIKEL 2 --}}
                    <div class="card border-warning border-opacity-50 shadow-sm flex-shrink-0 article-card"
                        style="width: 100%; max-width: 350px; scroll-snap-align: center; border-radius: 12px;">
                        <div class="overflow-hidden"
                            style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                            <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                class="card-img-top article-img" alt="Bahaya Hipertensi"
                                style="height: 200px; object-fit: cover; transition: transform 0.3s;">
                        </div>
                        <div class="card-body d-flex flex-column text-center p-4">
                            <h5 class="card-title fw-bold fs-6 mb-3" style="color: #001B48; min-height: 4.5rem;">
                                Bahaya Hipertensi, Upaya Pencegahan dan Pengendalian
                            </h5>
                            <p class="card-text text-muted small mb-4 line-clamp-3">
                                Hipertensi atau tekanan darah tinggi merupakan penyebab kematian nomor satu di dunia jika
                                tidak segera ditangani.
                            </p>
                            <a href="https://kemkes.go.id/id/bahaya-hipertensi-upaya-pencegahan-dan-pengendalian-hipertensi"
                                target="_blank" class="mt-auto text-decoration-underline fw-semibold"
                                style="color: #001B48;">
                                Baca selengkapnya
                            </a>
                        </div>
                    </div>

                    {{-- ARTIKEL 3 --}}
                    <div class="card border-warning border-opacity-50 shadow-sm flex-shrink-0 article-card"
                        style="width: 100%; max-width: 350px; scroll-snap-align: center; border-radius: 12px;">
                        <div class="overflow-hidden"
                            style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                class="card-img-top article-img" alt="Diet DASH"
                                style="height: 200px; object-fit: cover; transition: transform 0.3s;">
                        </div>
                        <div class="card-body d-flex flex-column text-center p-4">
                            <h5 class="card-title fw-bold fs-6 mb-3" style="color: #001B48; min-height: 4.5rem;">
                                Penerapan Dietary Approach to Stop Hypertension (DASH)
                            </h5>
                            <p class="card-text text-muted small mb-4 line-clamp-3">
                                Diet DASH merupakan pola makan sehat yang telah terbukti membantu menurunkan tekanan darah
                                dan kolesterol.
                            </p>
                            <a href="https://keslan.kemkes.go.id/view_artikel/2681/penerapan-dietary-approach-to-stop-hypertension-dash"
                                target="_blank" class="mt-auto text-decoration-underline fw-semibold"
                                style="color: #001B48;">
                                Baca selengkapnya
                            </a>
                        </div>
                    </div>

                    {{-- ARTIKEL 4 --}}
                    <div class="card border-warning border-opacity-50 shadow-sm flex-shrink-0 article-card"
                        style="width: 100%; max-width: 350px; scroll-snap-align: center; border-radius: 12px;">
                        <div class="overflow-hidden"
                            style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                            <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                class="card-img-top article-img" alt="Faktor Risiko"
                                style="height: 200px; object-fit: cover; transition: transform 0.3s;">
                        </div>
                        <div class="card-body d-flex flex-column text-center p-4">
                            <h5 class="card-title fw-bold fs-6 mb-3" style="color: #001B48; min-height: 4.5rem;">
                                9 Faktor Risiko Hipertensi yang Perlu Diwaspadai
                            </h5>
                            <p class="card-text text-muted small mb-4 line-clamp-3">
                                Kenali faktor risiko yang dapat memicu tekanan darah tinggi mulai dari gaya hidup hingga
                                genetik.
                            </p>
                            <a href="https://www.kompas.com/tren/read/2023/03/31/073000465/9-faktor-risiko-hipertensi-yang-perlu-diwaspadai"
                                target="_blank" class="mt-auto text-decoration-underline fw-semibold"
                                style="color: #001B48;">
                                Baca selengkapnya
                            </a>
                        </div>
                    </div>

                    {{-- ARTIKEL 5 --}}
                    <div class="card border-warning border-opacity-50 shadow-sm flex-shrink-0 article-card"
                        style="width: 100%; max-width: 350px; scroll-snap-align: center; border-radius: 12px;">
                        <div class="overflow-hidden"
                            style="border-top-left-radius: 12px; border-top-right-radius: 12px;">
                            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                class="card-img-top article-img" alt="Olahraga Hipertensi"
                                style="height: 200px; object-fit: cover; transition: transform 0.3s;">
                        </div>
                        <div class="card-body d-flex flex-column text-center p-4">
                            <h5 class="card-title fw-bold fs-6 mb-3" style="color: #001B48; min-height: 4.5rem;">
                                Olahraga untuk Hipertensi: Panduan Lengkap & Aman
                            </h5>
                            <p class="card-text text-muted small mb-4 line-clamp-3">
                                Panduan lengkap olahraga yang aman dan efektif menurut WHO & Kemenkes RI untuk penderita
                                hipertensi.
                            </p>
                            <a href="https://www.indonesian-publichealth.com/olahraga-untuk-hipertensi-panduan-lengkap-menurut-who-kemenkes-ri-aman-efektif/"
                                target="_blank" class="mt-auto text-decoration-underline fw-semibold"
                                style="color: #001B48;">
                                Baca selengkapnya
                            </a>
                        </div>
                    </div>

                </div>

                {{-- Tombol Navigasi Kanan --}}
                <button
                    class="btn btn-light shadow-sm position-absolute end-0 top-50 translate-middle-y rounded-circle d-flex align-items-center justify-content-center border-warning z-2"
                    id="btnNextArticle"
                    style="width: 50px; height: 50px; margin-right: -25px; border: 1px solid #f59e0b; color: #f59e0b; background-color: #001B48;">
                    {{-- Ganti icon font dengan SVG langsung agar pasti muncul --}}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>

            </div>
        </div>
    </div>


    {{-- BAGIAN 6: FAQ (Pertanyaan Umum) --}}
    <div id="faq" class="section py-5 bg-white position-relative overflow-hidden">
        {{-- Decoration Circle --}}
        <div
            style="position: absolute; top: -50px; left: -50px; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, rgba(255,255,255,0) 70%); pointer-events: none;">
        </div>

        <div class="container py-4">
            <div class="text-center mb-5" data-aos="fade-up">
                <h2 class="fw-bold" style="color: #001B48;">Pertanyaan Umum</h2>
                <p class="text-muted">Temukan jawaban untuk pertanyaan yang sering diajukan</p>
            </div>

            <div class="row justify-content-center" data-aos="fade-up">
                <div class="col-lg-9">
                    <div class="accordion accordion-flush d-flex flex-column gap-3" id="accordionFAQ">

                        {{-- Q1 --}}
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button collapsed fw-semibold shadow-sm rounded-3" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false"
                                    aria-controls="collapseOne"
                                    style="color: #001B48; border: 1px solid #f59e0b; background-color: #fff;">
                                    Apakah hasil skrining risiko hipertensi pada TensiTrack dapat menggantikan pemeriksaan
                                    dokter?
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                                data-bs-parent="#accordionFAQ">
                                <div
                                    class="accordion-body text-muted pt-2 px-4 pb-4 border-start border-end border-bottom border-warning-subtle rounded-bottom-3 bg-light bg-opacity-25">
                                    Tidak. TensiTrack hanya membantu memberikan indikasi awal terhadap risiko hipertensi,
                                    dan hasilnya tidak menggantikan diagnosis medis dari dokter.
                                </div>
                            </div>
                        </div>

                        {{-- Q2 --}}
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed fw-semibold shadow-sm rounded-3" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo"
                                    style="color: #001B48; border: 1px solid #f59e0b; background-color: #fff;">
                                    Bagaimana cara kerja TensiTrack dalam melakukan skrining risiko hipertensi?
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                data-bs-parent="#accordionFAQ">
                                <div
                                    class="accordion-body text-muted pt-2 px-4 pb-4 border-start border-end border-bottom border-warning-subtle rounded-bottom-3 bg-light bg-opacity-25">
                                    Sistem TensiTrack menggunakan metode forward chaining untuk menganalisis data pengguna
                                    dan menentukan potensi risiko hipertensi berdasarkan faktor-faktor kesehatan tertentu.
                                </div>
                            </div>
                        </div>

                        {{-- Q3 --}}
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed fw-semibold shadow-sm rounded-3" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false"
                                    aria-controls="collapseThree"
                                    style="color: #001B48; border: 1px solid #f59e0b; background-color: #fff;">
                                    Apakah kalkulator BMI dapat digunakan oleh seluruh kelompok masyarakat?
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                                data-bs-parent="#accordionFAQ">
                                <div
                                    class="accordion-body text-muted pt-2 px-4 pb-4 border-start border-end border-bottom border-warning-subtle rounded-bottom-3 bg-light bg-opacity-25">
                                    Ya, kalkulator BMI dapat digunakan oleh siapa saja, tetapi hasilnya perlu disesuaikan
                                    dengan kondisi individu seperti usia dan massa otot.
                                </div>
                            </div>
                        </div>

                        {{-- Q4 --}}
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingFour">
                                <button class="accordion-button collapsed fw-semibold shadow-sm rounded-3" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false"
                                    aria-controls="collapseFour"
                                    style="color: #001B48; border: 1px solid #f59e0b; background-color: #fff;">
                                    Apakah data kesehatan saya aman?
                                </button>
                            </h2>
                            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                                data-bs-parent="#accordionFAQ">
                                <div
                                    class="accordion-body text-muted pt-2 px-4 pb-4 border-start border-end border-bottom border-warning-subtle rounded-bottom-3 bg-light bg-opacity-25">
                                    TensiTrack menerapkan sistem keamanan data dengan enkripsi agar informasi pribadi
                                    pengguna tetap terlindungi.
                                </div>
                            </div>
                        </div>

                        {{-- Q5 --}}
                        <div class="accordion-item border-0">
                            <h2 class="accordion-header" id="headingFive">
                                <button class="accordion-button collapsed fw-semibold shadow-sm rounded-3" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false"
                                    aria-controls="collapseFive"
                                    style="color: #001B48; border: 1px solid #f59e0b; background-color: #fff;">
                                    Apakah skrining risiko hipertensi dapat dilakukan secara berkala?
                                </button>
                            </h2>
                            <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
                                data-bs-parent="#accordionFAQ">
                                <div
                                    class="accordion-body text-muted pt-2 px-4 pb-4 border-start border-end border-bottom border-warning-subtle rounded-bottom-3 bg-light bg-opacity-25">
                                    Ya, pengguna disarankan melakukan skrining secara berkala untuk memantau perubahan
                                    risiko dan menjaga kesehatan secara berkelanjutan.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>




    {{-- STYLE TAMBAHAN UNTUK ARTIKEL --}}
    <style>
        /* Sembunyikan Scrollbar default */
        #articleContainer::-webkit-scrollbar {
            display: none;
        }

        #articleContainer {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Efek Hover pada Gambar */
        .card:hover .article-img {
            transform: scale(1.05);
        }

        /* Membatasi teks deskripsi 3 baris */
        .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Hover pada tombol navigasi */
        #btnPrevArticle:hover,
        #btnNextArticle:hover {
            background-color: #f59e0b !important;
            color: white !important;
        }
    </style>


    {{-- BAGIAN MODALS & SCRIPTS USER --}}
    @if (Auth::check() && Gate::check('asUser'))
        @section('title', auth()->user()->name . html_entity_decode(' &mdash;'))
        @include('user.profile-modal')
        @include('user.detail-diagnosis-modal')
        @push('styleLibraries')
            {{-- Pastikan CDN ini tetap ada untuk icon lainnya --}}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            
            <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css">
            <link rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css" />
        @endpush
        @push('scriptPerPage')
            <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
            <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
            <script src="{{ asset('assets/vendor/chart.js/dist/Chart.min.js') }}"></script>
            <script src="{{ asset('assets/js/user/profile-select-manager.js') }}"></script>
            <script src="{{ asset('assets/js/user/profile-modal.js') }}"></script>
            <script src="{{ asset('assets/js/user/detail-diagnosis-modal.js') }}"></script>
        @endpush
    @endif
@endsection

@push('scriptPerPage')
    {{-- SCRIPT BAWAAN --}}
    <script type="text/javascript">
        const isUser = @json(Auth::check() && Gate::check('asUser'));
        const hasUserProfile = @json(Auth::user()->profile->id ?? false);
        let login = @json(session('success') ?? false);
        const csrfToken = '{{ csrf_token() }}';
        const tingkatRisikoData = @json($tingkatRisiko);
        const assetStorageTingkatRisiko = '{{ asset('/storage/tingkat-risiko/') }}';
        const assetStorageFaktorRisiko = '{{ asset('/storage/faktor-risiko/') }}';
    </script>

    {{-- SCRIPT TAMBAHAN UNTUK KALKULATOR BMI --}}
    <script>
        function calculateBMI() {
            // Ambil nilai input
            const height = document.getElementById('height').value;
            const weight = document.getElementById('weight').value;
            const resultInput = document.getElementById('result');

            // Validasi input
            if (height === "" || weight === "" || height <= 0 || weight <= 0) {
                resultInput.value = "Masukkan data yang valid!";
                return;
            }

            // Rumus BMI: Berat (kg) / (Tinggi (m) * Tinggi (m))
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

            // Tentukan Kategori
            let category = "";
            if (bmi < 18.5) {
                category = "Kurus (Underweight)";
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = "Ideal (Normal)";
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = "Gemuk (Overweight)";
            } else {
                category = "Obesitas";
            }

            // Tampilkan Hasil
            resultInput.value = `${bmi} - ${category}`;
        }
    </script>

    {{-- SCRIPT SLIDER ARTIKEL (BARU) --}}
    <script src="{{ asset('assets/js/user/diagnosis.js') }}"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('articleContainer');
            const btnPrev = document.getElementById('btnPrevArticle');
            const btnNext = document.getElementById('btnNextArticle');

            // Hitung lebar scroll (Lebar Card + Gap)
            const getScrollAmount = () => {
                const card = container.querySelector('.article-card');
                // Estimasi gap antar card (class gap-4 bootrap = 1.5rem ≈ 24px)
                const gap = 24;
                if (card) {
                    return card.offsetWidth + gap;
                }
                return 300; // Fallback jika card tidak ditemukan
            };

            if (btnNext && container) {
                btnNext.addEventListener('click', () => {
                    container.scrollBy({
                        left: getScrollAmount(),
                        behavior: 'smooth'
                    });
                });
            }

            if (btnPrev && container) {
                btnPrev.addEventListener('click', () => {
                    container.scrollBy({
                        left: -getScrollAmount(),
                        behavior: 'smooth'
                    });
                });
            }

            // Logic for Diagnosis Button
            const btnDiagnosis = document.getElementById('btn-diagnosis');
            if (btnDiagnosis) {
                const diagnosisModal = new DiagnosisModal(assetStorageFaktorRisiko, csrfToken);

                btnDiagnosis.addEventListener('click', function() {
                    if (!isUser) {
                        Swal.fire({
                            title: 'Anda Belum Login',
                            text: "Untuk memulai skrining, Anda harus login terlebih dahulu.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Login Sekarang',
                            cancelButtonText: 'Batal'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = '/login';
                            }
                        });
                        return;
                    }
                    diagnosisModal.showModal();
                });
            }
        });
    </script>
@endpush