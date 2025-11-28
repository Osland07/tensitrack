<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role; // Import the Role model
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Assign roles
        $userRole = Role::where('name', 'user')->first();
        $adminRole = Role::where('name', 'admin')->first();

        if ($userRole) {
            $user->roles()->syncWithoutDetaching($userRole->id);
        }
        if ($adminRole) {
            $admin->roles()->syncWithoutDetaching($adminRole->id);
        }
    }
}
