<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ScreeningHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'screening_date',
        'screening_result',
        'risk_level_id',
        'bmi',
    ];

    /**
     * Get the user that owns the ScreeningHistory.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the risk level associated with the ScreeningHistory.
     */
    public function riskLevel(): BelongsTo
    {
        return $this->belongsTo(RiskLevel::class);
    }

    /**
     * The risk factors that belong to the ScreeningHistory.
     */
    public function riskFactors(): BelongsToMany
    {
        return $this->belongsToMany(RiskFactor::class, 'screening_history_risk_factor')
                    ->withPivot('answer')
                    ->withTimestamps();
    }
}

