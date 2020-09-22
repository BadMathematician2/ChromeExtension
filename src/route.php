<?php

use ChromeExtension\Middleware\Authenticate;

Route::middleware(Authenticate::class)->get('domain', 'DomainController@index');

Route::middleware(Authenticate::class)->get('options', 'DomainController@options');


Route::post('authenticate', 'ExtentionController@authenticate')->name('ext-login');

Route::post('register', 'ExtentionController@register');

Route::post('logout', 'ExtentionController@logout');
