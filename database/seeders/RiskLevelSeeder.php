<?php

namespace Database\Seeders;

use App\Models\RiskLevel;
use Illuminate\Database\Seeder;

class RiskLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $riskLevels = [
            ['code' => 'H01', 'name' => 'Rendah', 'description' => 'Tidak ada atau sangat sedikit faktor risiko terdeteksi. Pertahankan gaya hidup sehat.'],
            ['code' => 'H02', 'name' => 'Sedang', 'description' => 'Beberapa faktor risiko terdeteksi. Perlu perhatian dan perubahan gaya hidup.'],
            ['code' => 'H03', 'name' => 'Tinggi', 'description' => 'Banyak faktor risiko terdeteksi. Sangat disarankan untuk konsultasi medis dan perubahan gaya hidup signifikan.'],
        ];

        foreach ($riskLevels as $level) {
            RiskLevel::firstOrCreate(
                ['code' => $level['code']],
                ['name' => $level['name'], 'description' => $level['description']]
            );
        }
    }
}
