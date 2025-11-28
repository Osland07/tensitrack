<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRiskFactorRequest;
use App\Http\Requests\Admin\UpdateRiskFactorRequest;
use App\Models\RiskFactor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRiskFactorController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('admin/RiskFactors/Create');
    }

    public function edit(RiskFactor $riskFactor): Response
    {
        return Inertia::render('admin/RiskFactors/Edit', [
            'riskFactor' => $riskFactor,
        ]);
    }

    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $riskFactors = RiskFactor::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('code', 'like', '%'.$search.'%');
            })
            ->orderBy('code')
            ->paginate(10) // Paginate with 10 items per page
            ->withQueryString(); // Keep query string for pagination links

        return Inertia::render('admin/RiskFactors/Index', [
            'riskFactors' => $riskFactors,
            'filters' => ['search' => $search], // Pass current search term to frontend
        ]);
    }

    public function print(Request $request): Response
    {
        $search = $request->input('search');

        $riskFactors = RiskFactor::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', '%'.$search.'%')
                    ->orWhere('code', 'like', '%'.$search.'%');
            })
            ->orderBy('code')
            ->get(); // Get all results, not paginated

        return Inertia::render('admin/RiskFactors/Print', [
            'riskFactors' => [
                'data' => $riskFactors,
            ],
            'filters' => ['search' => $search],
        ]);
    }

    public function store(StoreRiskFactorRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['code'])) {
            $last = RiskFactor::query()
                ->where('code', 'like', 'E%')
                ->orderBy('code', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->code) + 1 : 1;
            $data['code'] = 'E'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        RiskFactor::query()->create($data);

        return to_route('risk-factors.index')->with('success', 'Data berhasil disimpan!');
    }

    public function update(UpdateRiskFactorRequest $request, RiskFactor $riskFactor): RedirectResponse
    {
        $data = $request->validated();

        if (empty($data['code']) && $riskFactor->code === null) {
            $last = RiskFactor::query()
                ->where('code', 'like', 'E%')
                ->orderBy('code', 'desc')
                ->first();

            $next = $last ? (int) preg_replace('/\D/', '', $last->code) + 1 : 1;
            $data['code'] = 'E'.str_pad((string) $next, 2, '0', STR_PAD_LEFT);
        }

        $riskFactor->update($data);

        return back()->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(RiskFactor $riskFactor): RedirectResponse
    {
        $riskFactor->delete();

        return back()->with('success', 'Data berhasil dihapus!');
    }
}
