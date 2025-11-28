@echo off
echo "Menjalankan build aset frontend..."
call npm run build
echo "Build selesai. Memulai server..."

start "Laravel Artisan Server" cmd /k "php artisan serve"
start "Vite Dev Server" cmd /k "npm run dev"
