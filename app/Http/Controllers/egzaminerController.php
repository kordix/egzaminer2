<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Tag;
use App\Tagpivot;
use Illuminate\Support\Facades\DB;


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

    public function tagsToQuestion($id){
        $rows = DB::table('questions_tags')->where('question_id','=',$id)->join('tags','questions_tags.tag_id','=','tags.id')->get();
        // $rows = Tagpivot::where('question_id','=',$id)->join('questions');
        return $rows;
    }

    public function update($id, Request $request){
        $question = Question::find($id);

        $question->update([
            'question'=>request('question'),
            'answer'=>request('answer')
        ]);
    }

    public function add(Request $request){
        Question::create($request->all());
    }

    public function addTag(Request $request){
        Tag::create($request->all());
    }

    public function deleteTag($id){
        Tag::find($id)->delete();
    }

    public function deleteTagToQuestion($qid,$tid){
        $row = Tagpivot::where('question_id','=',$qid)->where('tag_id','=',$tid)->delete();
        // dd($row);
        // ->delete();
    }

    public function addTagToQuestion($qid,$tid){
        Tagpivot::create([
            'question_id'=>$qid,
            'tag_id'=>$tid
        ]);
        // dd($row);
        // ->delete();
    }


}
