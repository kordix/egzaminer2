<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Result;

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
        })->where('language', '=', 'DE')->join('results','questions.id','=','results.question_id')->get();
        return $rows;
        // dd($rows);
        // return view('layouts.list', compact('rows', 'currentlanguage', 'categories', 'tags'));
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

    public function update2($id,Request $request){
            $question = Result::find($id);
        // dd($request->counter);
        $question->update(['counter'=>$request->counter]);

    }

    public function update3($id, Request $request){
        $question = Question::find($id);
        $question->update($request->all());
        dd($request->all());

    }

    public function add(Request $request){
        $row = Question::create([
            'answer' => $request->answer,
            'question' => $request->question,
            'rodzajnik' => $request->rodzajnik
        ]);

        Result::create([
            'question_id'=>$row->id,
            'counter'=>0,
            'user_id'=>1
        ]);
        Tagpivot::create([
            'question_id'=>$row->id,
            'tag_id'=>$request->tag_id
        ]);

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

    public function delete($id){
        Question::find($id)->delete();
    }

    public function getQuestion($id){
        return Question::find($id);
    }


}
