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
        Schema::table('places', function (Blueprint $table) {
            $table->unique(['hall_id','row','chair'], 'hall_row_chair');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('places', function (Blueprint $table) {
          $table->dropIndex('hall_row_chair');
      });
    }
};
