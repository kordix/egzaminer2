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
use App\Tag;

use Illuminate\Support\Facades\DB;


Route::view('/','start');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/all', function () {
    $questions = DB::table('questions')->join('results','questions.id','=','results.question_id')->get();
    return $questions;
});

Route::get('/categories', function () {
    return Category::all();
});

Route::get('/tags', function () {
    return Tag::all();
});

Route::post('/add','egzaminerController@add');
Route::post('/addtag','egzaminerController@addtag');
Route::delete('/delete/{id}','egzaminerController@delete');
Route::delete('/deletetag/{id}','egzaminerController@deletetag');
Route::post('/addtagtoquestion/{qid}/{tid}','egzaminerController@addTagToQuestion');
Route::delete('/deletetagtoquestion/{qid}/{tid}','egzaminerController@deleteTagToQuestion');
Route::get('/tagstoquestion/{id}','egzaminerController@tagsToQuestion');








Route::patch('/updatequestion/{id}', 'egzaminerController@update');
Route::patch('/updatequestion2/{id}', 'egzaminerController@update2');
