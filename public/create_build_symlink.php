<?php

/**
 * Ini adalah skrip satu kali pakai untuk membuat symlink.
 * SANGAT PENTING:
 * 1. Jangan pernah commit file ini ke Git.
 * 2. Upload file ini secara manual ke public_html di hosting Anda.
 * 3. Setelah dijalankan di browser dan symlink berhasil, HAPUS file ini dari hosting Anda dan juga dari lokal Anda.
 *    Ini adalah masalah keamanan jika file ini tetap ada di folder publik.
 */

// Path ke folder 'build' yang ada di dalam project Laravel Anda (hasil 'npm run build')
// Sesuaikan jika project Laravel Anda ada di path yang berbeda
$target = '/home/tensitra/tensitrack/public/build';

// Path ke mana symlink (shortcut) 'build' akan dibuat, agar bisa diakses web
// Ini biasanya di folder utama public_html Anda
$link = '/home/tensitra/public_html/build';

echo "Mencoba membuat symlink...\n";
echo "Target: $target\n";
echo "Link: $link\n\n";

// Cek apakah target (folder build di project utama) ada
if (!file_exists($target)) {
    echo "Error: Folder target '$target' tidak ditemukan.\n";
    echo "Pastikan Anda sudah 'git pull' di folder tensitrack dan sudah menjalankan 'npm run build' di lokal lalu push.\n";
    exit(1);
}

// Cek apakah symlink sudah ada atau folder 'build' sudah ada di public_html
if (file_exists($link)) {
    // Jika $link adalah symlink, kita bisa menghapusnya untuk membuat yang baru
    if (is_link($link)) {
        if (unlink($link)) {
            echo "Symlink lama '$link' berhasil dihapus.\n";
        } else {
            echo "Error: Gagal menghapus symlink lama '$link'. Periksa izin file.\n";
            exit(1);
        }
    } elseif (is_dir($link)) {
        echo "Error: Folder '$link' sudah ada dan bukan symlink. Hapus folder ini secara manual di File Manager hosting Anda terlebih dahulu.\n";
        exit(1);
    } else {
        echo "Error: '$link' sudah ada dan bukan folder atau symlink. Hapus secara manual.\n";
        exit(1);
    }
}

// Buat symlink
if (symlink($target, $link)) {
    echo "Symlink dari '$target' ke '$link' berhasil dibuat.\n";
    echo "Folder 'build' sekarang sudah terhubung.\n";
    echo "\nSANGAT PENTING: Hapus file ini ('create_build_symlink.php') dari hosting Anda SEKARANG juga untuk keamanan!\n";
    echo "Dan juga hapus dari lokal Anda. Jangan pernah commit file ini ke Git.\n";
    exit(0);
} else {
    echo "Error: Gagal membuat symlink.\n";
    echo "Mungkin ada masalah izin folder (permission) atau server tidak mengizinkan symlink.\n";
    echo "Anda mungkin perlu menghubungi provider hosting Anda.\n";
    exit(1);
}

?>