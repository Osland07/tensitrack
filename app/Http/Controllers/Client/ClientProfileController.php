<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ScreeningHistory; // Import ScreeningHistory model

class ClientProfileController extends Controller
{
    /**
     * Display the client profile page with user data and screening history.
     */
    public function index(Request $request): Response
    {
        $user = Auth::user();

        // Fetch user's screening histories
        $search = $request->input('search');
        $screeningHistories = $user->screeningHistories() // Assuming User model has screeningHistories relationship
            ->with(['riskLevel']) // Eager load risk level for display
            ->when($search, function ($query, $search) {
                $query->where('screening_result', 'like', "%{$search}%")
                      ->orWhere('bmi', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Client/Profile/Index', [
            'user' => $user->only('id', 'name', 'email', 'height', 'weight', 'bmi', 'age'), // Pass relevant user data
            'screeningHistories' => $screeningHistories,
            'filters' => $request->only(['search']),
        ]);
    }
}
