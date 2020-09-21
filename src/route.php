<?php

use ChromeExtension\Middleware\Authenticate;

Route::middleware(Authenticate::class)->get('domain', 'DomainController@index');

Route::middleware(Authenticate::class)->get('options', 'DomainController@options');
