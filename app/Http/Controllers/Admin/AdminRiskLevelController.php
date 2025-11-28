<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRiskLevelRequest;
use App\Http\Requests\Admin\UpdateRiskLevelRequest;
use App\Models\RiskLevel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRiskLevelController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/RiskLevels/Create');
    }

    public function edit(RiskLevel $riskLevel): Response
    {
        return Inertia::render('admin/RiskLevels/Edit', [
            'riskLevel' => $riskLevel,
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $riskLevels = RiskLevel::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('code', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            })
            ->orderBy('code')
            ->paginate(10) // Paginate with 10 items per page
            ->withQueryString(); // Keep query string for pagination links

        return Inertia::render('admin/RiskLevels/Index', [
            'riskLevels' => $riskLevels,
            'filters' => ['search' => $search], // Pass current search term to frontend
        ]);
    }

    public function print(Request $request): Response
    {
        $search = $request->input('search');

        $riskLevels = RiskLevel::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('code', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
            })
            ->orderBy('code')
            ->get(); // Get all results, not paginated

        return Inertia::render('admin/RiskLevels/Print', [
            'riskLevels' => [
                'data' => $riskLevels,
            ],
            'filters' => ['search' => $search],
        ]);
    }

    public function store(StoreRiskLevelRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['code'])) {
            $last = RiskLevel::query()
                ->where('code', 'like', 'H%')
                ->orderBy('code', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->code) + 1 : 1;
            $data['code'] = 'H'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        RiskLevel::query()->create($data);

        return to_route('admin.risk-levels.index')->with('success', 'Data berhasil disimpan!');
    }

    public function update(UpdateRiskLevelRequest $request, RiskLevel $riskLevel): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['code']) && $riskLevel->code === null) {
            $last = RiskLevel::query()
                ->where('code', 'like', 'H%')
                ->orderBy('code', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->code) + 1 : 1;
            $data['code'] = 'H'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        $riskLevel->update($data);

        return back()->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(RiskLevel $riskLevel): RedirectResponse
    {
        $riskLevel->delete();

        return back()->with('success', 'Data berhasil dihapus!');
    }
}
