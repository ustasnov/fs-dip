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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->integer('hall1')->default(1);
            $table->integer('hall2')->default(1);
            $table->integer('hall3')->default(1);
            $table->boolean('section1_opened')->default(true);
            $table->boolean('section2_opened')->default(true);
            $table->boolean('section3_opened')->default(true);
            $table->boolean('section4_opened')->default(true);
            $table->boolean('section5_opened')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
