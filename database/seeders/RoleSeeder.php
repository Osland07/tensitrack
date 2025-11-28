<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Permission; // Import the Permission model
use App\Models\Role; // Import the Role model

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'user']);

        // Attach all existing permissions to the admin role
        $permissions = Permission::all();
        $adminRole->permissions()->sync($permissions->pluck('id'));
    }
}
