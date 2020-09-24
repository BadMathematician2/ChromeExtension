<?php

use ChromeExtension\Middleware\Authenticate;

Route::middleware(Authenticate::class)->get('domain', 'DomainController@index');

Route::middleware(Authenticate::class)->get('options', 'DomainController@options');


Route::post('authenticate', 'ExtensionController@authenticate')->name('ext-login');

Route::post('register', 'ExtensionController@register');

Route::get('logout', 'ExtensionController@logout');

