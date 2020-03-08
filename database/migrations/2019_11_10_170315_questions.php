<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Questions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('question')->default('')->nullable();
            $table->string('answer')->default('')->nullable();
            $table->string('language')->default('DE')->nullable();
            $table->string('partofspeech')->default('')->nullable();
            $table->string('tags')->default('')->nullable();
            $table->string('rodzajnik')->default('')->nullable();
            $table->string('fav')->default('')->nullable();
            $table->string('level')->default('')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
