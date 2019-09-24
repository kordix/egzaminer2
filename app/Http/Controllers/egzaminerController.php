<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;

class egzaminerController extends Controller
{
  public function questionsToTag($id){
    $tags2=[$id];
    // $rows = Tag::all();
    $rows = Question::with('tags')->whereHas('tags', function ($q) use ($tags2) {
        $q->whereIn('id', $tags2);
    })->where('language', '=', 'DE')->get();
    dd($rows);
    return view('layouts.list', compact('rows', 'currentlanguage', 'categories', 'tags'));
}

public function update($id, Request $request){
    $question = Question::find($id);

    $question->update([
        'question'=>request('question'),
        'answer'=>request('answer')
    ]);
}
}
