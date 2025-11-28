<?php

use App\Models\RiskFactor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view risk factors page', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->get(route('risk-factors.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('admin/risk-factors'));
});

test('creating risk factor auto-generates code', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->post(route('risk-factors.store'), [
            'name' => 'Faktor A',
            'description' => 'Deskripsi',
            'suggestion' => 'Saran',
        ])->assertRedirect();

    $created = RiskFactor::first();
    expect($created->code)->toBe('E01');
});
