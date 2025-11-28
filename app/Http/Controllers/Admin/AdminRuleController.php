<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('admin/Rules/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        // For now, return the index page or a simple create form if needed later
        return Inertia::render('admin/Rules/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        // Implement store logic later
        return to_route('admin.rules.index')->with('success', 'Rule created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        // For now, return the index page or a simple edit form if needed later
        return Inertia::render('admin/Rules/Edit', ['ruleId' => $id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): \Illuminate\Http\RedirectResponse
    {
        // Implement update logic later
        return to_route('admin.rules.index')->with('success', 'Rule updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): \Illuminate\Http\RedirectResponse
    {
        // Implement destroy logic later
        return to_route('admin.rules.index')->with('success', 'Rule deleted successfully.');
    }
}
