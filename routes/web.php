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
//
// Route::get('/', function () {
//     return view('welcome');
// });

use App\Question;
use App\Category;


Route::view('/','start');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/all', function () {
    return Question::all();
});

Route::get('/categories', function () {
    return Category::all();
});


Route::patch('/counterquestion/{id}', function ($id) {
    $question = Question::find( $id);
    $question->update(['counter'=>$question->counter + 1]);
});
