<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExtensionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('domain_list', function (Blueprint $table) {
            $table->id();

            $table->string('domain');
            $table->unique('domain');
            $table->boolean('domain_thematic');
            $table->integer('status');
            $table->string('type');
            $table->integer('price');
            $table->string('url');
            $table->boolean('thematic');
            $table->string('link');

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
        Schema::dropIfExists('extensions');
    }
}
