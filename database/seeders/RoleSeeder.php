<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Permission;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        Role::firstOrCreate(['name' => 'superadmin']);
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);

        // Define permissions for the admin role as per user's request
        $adminPermissions = [
            'risk-levels.view',
            'risk-levels.create',
            'risk-levels.edit',
            'risk-levels.delete',
            'risk-levels.print',

            'risk-factors.view',
            'risk-factors.create',
            'risk-factors.edit',
            'risk-factors.delete',
            'risk-factors.print',

            'rules.view',
            'rules.create',
            'rules.edit',
            'rules.delete',

            'screening-history.view',
            'screening-history.delete',
            'screening-history.print',
        ];

        // Find the permissions and sync them to the admin role
        $permissions = Permission::whereIn('name', $adminPermissions)->get();
        $adminRole->syncPermissions($permissions);
    }
}