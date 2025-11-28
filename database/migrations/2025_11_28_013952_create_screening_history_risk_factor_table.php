<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('screening_history_risk_factor', function (Blueprint $table) {
            $table->foreignId('screening_history_id')->constrained('screening_histories')->onDelete('cascade');
            $table->foreignId('risk_factor_id')->constrained('risk_factors')->onDelete('cascade');
            $table->boolean('answer')->default(false); // Atau bisa disesuaikan dengan kebutuhan (misal: integer untuk bobot)
            $table->primary(['screening_history_id', 'risk_factor_id']); // Composite primary key
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('screening_history_risk_factor');
    }
};
