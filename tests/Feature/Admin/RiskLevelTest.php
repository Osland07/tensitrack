<?php

use App\Models\RiskLevel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('admin can view risk levels page', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->get(route('risk-levels.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page->component('admin/risk-levels'));
});

test('creating risk level auto-generates code', function () {
    $user = User::factory()->create();
    $this->actingAs($user)
        ->post(route('risk-levels.store'), [
            'name' => 'Rendah',
            'description' => 'Risiko rendah',
            'suggestion' => 'Tetap pantau',
        ])->assertRedirect();

    $created = RiskLevel::first();
    expect($created->code)->toBe('H01');
});
