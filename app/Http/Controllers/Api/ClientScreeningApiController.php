<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RiskFactor;
use App\Models\RiskLevel;
use App\Models\ScreeningHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ClientScreeningApiController extends Controller
{
    /**
     * Get screening questions (RiskFactors).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQuestions()
    {
        $questions = RiskFactor::orderBy('order')->get(['id', 'name']);

        return response()->json($questions);
    }

    /**
     * Submit screening answers and calculate risk.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function submitScreening(Request $request)
    {
        $validated = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.id' => ['required', 'exists:risk_factors,id'],
            'answers.*.answer' => ['required', 'boolean'],
            'bmi' => ['required', 'numeric'],
        ]);

        $totalScore = 0;
        $riskFactorsAnswered = [];

        // Calculate score and collect answered risk factors
        foreach ($validated['answers'] as $answerData) {
            $riskFactor = RiskFactor::find($answerData['id']);
            if ($riskFactor && $answerData['answer']) { // Only add score if answer is 'true'
                $totalScore += $riskFactor->score;
                $riskFactorsAnswered[] = $riskFactor;
            }
        }

        $totalScore = 0;
        $riskFactorsAnswered = [];
        $answeredFactorCodes = []; // To store codes of factors answered 'true'

        // Fetch all risk factors to get their codes
        $allRiskFactors = RiskFactor::all()->keyBy('id');

        // Calculate score and collect answered risk factors
        foreach ($validated['answers'] as $answerData) {
            $riskFactor = $allRiskFactors->get($answerData['id']);
            if ($riskFactor && $answerData['answer']) { // Only consider if answer is 'true'
                $totalScore += $riskFactor->score;
                $riskFactorsAnswered[] = $riskFactor;
                $answeredFactorCodes[] = $riskFactor->code;
            }
        }

        // --- Determine Risk Level based on Provided Rules ---
        $isE01Answered = in_array('E01', $answeredFactorCodes);
        $otherFactorsCount = count(array_filter($answeredFactorCodes, function ($code) {
            return $code !== 'E01' && str_starts_with($code, 'E'); // Assuming E02-E11 are 'E' followed by number
        }));
        $lifestyleFactorsCount = count(array_filter($answeredFactorCodes, function ($code) {
            return $code !== 'E01' && preg_match('/E(0[2-9]|1[0-1])/', $code); // E02 to E11
        }));


        $riskLevelName = 'Tidak Diketahui';
        $riskDescriptionText = 'Tidak dapat menentukan tingkat risiko.';
        $riskLevelId = null;
        $determinedRiskLevel = null;

        // H03 (Tinggi - High Risk)
        if ($isE01Answered && $otherFactorsCount >= 3) { // R1
            $riskLevelName = 'Tinggi';
        } elseif ($lifestyleFactorsCount >= 5) { // R2
            $riskLevelName = 'Tinggi';
        }
        // H02 (Sedang - Moderate Risk)
        elseif ($isE01Answered && $otherFactorsCount >= 0 && $otherFactorsCount <= 2) { // R3
            $riskLevelName = 'Sedang';
        } elseif (!$isE01Answered && $otherFactorsCount >= 3) { // R4
            $riskLevelName = 'Sedang';
        }
        // H01 (Rendah - Low Risk)
        elseif (!$isE01Answered && $otherFactorsCount <= 2) { // R5
            $riskLevelName = 'Rendah';
        }

        // Fetch the RiskLevel object from DB based on determined name
        $determinedRiskLevel = RiskLevel::where('name', $riskLevelName)->first();
        if ($determinedRiskLevel) {
            $riskLevelName = $determinedRiskLevel->name;
            $riskDescriptionText = $determinedRiskLevel->description;
            $riskLevelId = $determinedRiskLevel->id;
        }


        // Prepare suggestions based on answered risk factors and determined risk level
        $suggestions = [];
        foreach ($riskFactorsAnswered as $factor) {
            if ($factor->suggestion) {
                $suggestions[] = $factor->suggestion;
            }
        }
        // Add general suggestion from the determined risk level, if any
        if ($determinedRiskLevel && $determinedRiskLevel->suggestion) {
            $suggestions[] = $determinedRiskLevel->suggestion;
        }

        // Save Screening History
        $screeningHistory = new ScreeningHistory();
        $screeningHistory->user_id = Auth::id(); // Nullable, if guest screening is allowed
        $screeningHistory->screening_date = now();
        $screeningHistory->bmi = $validated['bmi'];
        $screeningHistory->screening_result = $riskLevelName; // Store risk level name
        $screeningHistory->risk_level_id = $riskLevelId;
        $screeningHistory->save();

        // Attach risk factors with user's answers
        $pivotData = [];
        foreach ($validated['answers'] as $answerData) {
            $pivotData[$answerData['id']] = ['answer' => $answerData['answer']];
        }
        $screeningHistory->riskFactors()->attach($pivotData);

        return response()->json([
            'riskLevel' => $riskLevelName,
            'riskDescription' => $riskDescriptionText,
            'suggestions' => array_unique($suggestions), // Ensure unique suggestions
            'screeningHistoryId' => $screeningHistory->id,
            'totalScore' => $totalScore,
        ]);
    }

    /**
     * Save authenticated user's BMI details.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function saveBmiDetails(Request $request)
    {
        $validated = $request->validate([
            'height' => ['required', 'numeric', 'min:1'],
            'weight' => ['required', 'numeric', 'min:1'],
            'bmi' => ['required', 'numeric', 'min:1'],
        ]);

        if (Auth::check()) {
            $user = Auth::user();
            $user->height = $validated['height'];
            $user->weight = $validated['weight'];
            $user->bmi = $validated['bmi'];
            $user->save();

            return response()->json(['message' => 'BMI details saved successfully.']);
        }

        return response()->json(['message' => 'User not authenticated.'], 401);
    }
}