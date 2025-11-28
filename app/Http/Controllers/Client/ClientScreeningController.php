<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\RiskFactor;
use App\Models\RiskLevel;
use App\Models\ScreeningHistory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ClientScreeningController extends Controller
{
    /**
     * Display the screening form.
     */
    public function index(): Response
    {
        $riskFactors = RiskFactor::orderBy('order')->get(); // Assume 'order' column exists or sort by id
        $riskLevels = RiskLevel::all(); // Used for displaying possible outcomes or for calculations

        return Inertia::render('Client/Screening/Index', [
            'riskFactors' => $riskFactors,
            'riskLevels' => $riskLevels, // Pass risk levels if needed for frontend logic
        ]);
    }

    /**
     * Process the screening answers and save the result.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Validasi Input
        $validated = $request->validate([
            'weight' => 'required|numeric|min:1',
            'height' => 'required|numeric|min:1',
            'answers' => 'required|array',
            'answers.*.risk_factor_id' => 'required|exists:risk_factors,id',
            'answers.*.answer' => 'required|boolean',
        ]);

        $user = Auth::user();
        if (!$user) {
            return to_route('login')->with('error', 'Anda harus login untuk melakukan skrining.');
        }

        // 2. Hitung BMI
        $weight = (float) $validated['weight']; // kg
        $height = (float) $validated['height']; // cm
        $heightInMeters = $height / 100; // convert cm to meters
        $bmi = round($weight / ($heightInMeters * $heightInMeters), 2);

        // 3. Logika Perhitungan Risiko (Placeholder)
        // Ini adalah bagian di mana Anda akan memiliki logika kompleks untuk
        // menentukan 'screening_result' dan 'risk_level_id' berdasarkan BMI dan jawaban faktor risiko.
        // Untuk sekarang, kita buat placeholder sederhana.

        $totalRiskScore = 0;
        foreach ($validated['answers'] as $answer) {
            if ($answer['answer']) { // If the answer is 'true' (Ya)
                // Get the score for this risk factor. You might need to retrieve RiskFactor model here.
                // For simplicity, let's assume each 'true' answer adds 1 to the score for now.
                // In a real scenario, you'd fetch RiskFactor::find($answer['risk_factor_id'])->score;
                $totalRiskScore += 1;
            }
        }

        $screeningResult = 'Normal';
        $riskLevelId = null;

        // Contoh sederhana penentuan risk_level_id berdasarkan totalRiskScore dan BMI
        // Anda harus mengganti ini dengan logika bisnis yang sebenarnya
        $riskLevels = RiskLevel::all(); // Ambil semua risk levels
        if ($bmi >= 25 || $totalRiskScore >= 3) { // Contoh: Obesitas atau 3+ faktor risiko
            $screeningResult = 'Risiko Tinggi Hipertensi';
            $riskLevelId = $riskLevels->firstWhere('name', 'Tinggi')->id ?? null; // Assume there's a 'Tinggi' risk level
        } elseif ($bmi >= 23 || $totalRiskScore >= 1) {
            $screeningResult = 'Risiko Sedang Hipertensi';
            $riskLevelId = $riskLevels->firstWhere('name', 'Sedang')->id ?? null; // Assume there's a 'Sedang' risk level
        } else {
            $riskLevelId = $riskLevels->firstWhere('name', 'Rendah')->id ?? null; // Assume there's a 'Rendah' risk level
        }


        // 4. Simpan Screening History
        $screeningHistory = ScreeningHistory::create([
            'user_id' => $user->id,
            'screening_date' => now(),
            'screening_result' => $screeningResult,
            'risk_level_id' => $riskLevelId,
        ]);

        // 5. Simpan Jawaban Faktor Risiko ke Tabel Pivot
        $pivotData = [];
        foreach ($validated['answers'] as $answer) {
            $pivotData[$answer['risk_factor_id']] = ['answer' => $answer['answer']];
        }
        $screeningHistory->riskFactors()->sync($pivotData);

        return to_route('screening.result', ['screeningHistory' => $screeningHistory->id])
            ->with('success', 'Skrining berhasil disimpan!');
    }

    /**
     * Display the screening result.
     */
    public function showResult(ScreeningHistory $screeningHistory): Response
    {
        // Load relationships for display
        $screeningHistory->load('user', 'riskLevel', 'riskFactors');

        return Inertia::render('Client/Screening/Result', [
            'screeningHistory' => $screeningHistory,
        ]);
    }
}

