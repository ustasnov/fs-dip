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
        Schema::table('halls', function (Blueprint $table) {
          $table->integer('price', false, true)->default(0)->after('chairs_in_row');
        });
        Schema::table('halls', function (Blueprint $table) { 
            $table->integer('vip_price', false, true)->default(0)->after('price');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('halls', function (Blueprint $table) {
          $table->dropColumn('price');
        });
        Schema::table('halls', function (Blueprint $table) {
          $table->dropColumn('vip_price');
        });
    }
};
