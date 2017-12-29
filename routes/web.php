<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layout');
});

Route::prefix('admin')->group(function () {
	Route::get('', function() {
		return view('admin');
	});
    Route::get('add-manga', function () {
        return view('admin');
    });
    Route::get('list-manga', function () {
        return view('admin');
    });
    Route::get('detail-manga/{id}', function () {
        return view('admin');
    });
    Route::get('add-chapter', function () {
        return view('admin');
    });
    Route::get('add-multi-chapter', function () {
        return view('admin');
    });
    Route::get('list-chapter', function () {
        return view('admin');
    });
    Route::get('edit-chapter/{id}', function () {
        return view('admin');
    });
});

Route::resource('mangas', 'MangaController');
Route::resource('chapters', 'ChapterController');
