<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Permission; // Import the Permission model

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            // Users
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Roles
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',

            // Permissions
            'permissions.view',

            // Risk Levels
            'risk-levels.view',
            'risk-levels.create',
            'risk-levels.edit',
            'risk-levels.delete',
            'risk-levels.print',

            // Risk Factors
            'risk-factors.view',
            'risk-factors.create',
            'risk-factors.edit',
            'risk-factors.delete',
            'risk-factors.print',

            // Rules
            'rules.view',
            'rules.create',
            'rules.edit',
            'rules.delete',

            // Screening History
            'screening-history.view',
            'screening-history.delete',
            'screening-history.print',

            // Settings & Profile
            'profile.view',
            'profile.update',
            'appearance.edit',

            // Client Screening
            'screening.perform',
            'screening.view-history',
            'screening.view-result',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
