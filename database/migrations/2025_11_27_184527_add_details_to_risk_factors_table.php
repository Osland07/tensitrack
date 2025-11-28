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
        Schema::table('risk_factors', function (Blueprint $table) {
            $table->text('description')->nullable()->after('name');
            $table->text('suggestion')->nullable()->after('description');
            $table->integer('score')->default(0)->after('suggestion');
            $table->integer('order')->default(0)->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('risk_factors', function (Blueprint $table) {
            $table->dropColumn('order');
            $table->dropColumn('score');
            $table->dropColumn('suggestion');
            $table->dropColumn('description');
        });
    }
};
