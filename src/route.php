<?php

use ChromeExtension\Middleware\Authenticate;

Route::middleware(Authenticate::class)->get('domain', 'DomainController@index');

Route::get('options', 'DomainController@options');
