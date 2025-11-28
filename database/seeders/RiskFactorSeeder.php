<?php

namespace Database\Seeders;

use App\Models\RiskFactor;
use Illuminate\Database\Seeder;

class RiskFactorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facts = [
            [
                'code' => 'E01',
                'description' => 'Tekanan darah meningkat (sistolik 120–139 atau diastolik 80–89)',
            ],
            [
                'code' => 'E02',
                'description' => 'Riwayat hipertensi pada keluarga inti',
            ],
            [
                'code' => 'E03',
                'description' => 'Obesitas (IMT ≥ 25)',
            ],
            [
                'code' => 'E04',
                'description' => 'Kebiasaan merokok',
            ],
            [
                'code' => 'E05',
                'description' => 'Kebiasaan mengonsumsi alkohol',
            ],
            [
                'code' => 'E06',
                'description' => 'Sering minum minuman berenergi (kratingdeng, extra joss)',
            ],
            [
                'code' => 'E07',
                'description' => 'Sering konsumsi kafein kuat (kopi kental / teh kental)',
            ],
            [
                'code' => 'E08',
                'description' => 'Sering makan makanan tinggi garam atau lemak',
            ],
            [
                'code' => 'E09',
                'description' => 'Jarang olahraga',
            ],
            [
                'code' => 'E10',
                'description' => 'Pola tidur buruk (sering begadang)',
            ],
            [
                'code' => 'E11',
                'description' => 'Sering mengalami stres atau kecemasan',
            ],
        ];

        foreach ($facts as $fact) {
            RiskFactor::firstOrCreate(
                ['code' => $fact['code']],
                [
                    'name' => $fact['description'], // Use description as name
                ]
            );
        }
    }
}
