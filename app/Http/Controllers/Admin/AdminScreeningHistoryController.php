<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ScreeningHistory;
use App\Models\RiskLevel;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminScreeningHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $filters = $request->only('search');
        $screeningHistories = ScreeningHistory::with(['user', 'riskLevel', 'riskFactors'])
            ->select('id', 'user_id', 'risk_level_id', 'screening_date', 'screening_result', 'bmi', 'created_at')
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/ScreeningHistory/Index', [
            'screeningHistories' => $screeningHistories,
            'filters' => $filters,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ScreeningHistory $screeningHistory)
    {
        // This method will not be used as per user's request. Details are shown in modal on index page.
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ScreeningHistory $screeningHistory): RedirectResponse
    {
        $screeningHistory->delete();

        return redirect()->route('admin.screening-history.index');
    }
}