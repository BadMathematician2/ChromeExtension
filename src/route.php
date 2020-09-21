<?php

Route::get('domain', 'DomainController@index')->middleware('authenticate');

Route::get('options', 'DomainController@options')->middleware('authenticate');
