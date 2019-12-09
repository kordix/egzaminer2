<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tagpivot extends Model
{
    protected $table="questions_tags";
    protected $guarded=[];
    public $timestamps = false;


}
