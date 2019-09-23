@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row" id="sets">
           <div class="col-md-4" style="display:flex">
           <select class="form-control" name="" v-model="activeobszar" style="width:150px;margin-right:10px">
               <option value="egzaminer">Egzaminer</option>
               <option value="list">Lista</option>
               <option value="showcase">Showcase</option>
               <option value="tags">tagi</option>
           </select>
           </div>
           <div class="col-md-4">
               <button class="ikona ikonagerman" :class="{active:activelanguage=='DE'}" @click="setLanguage('DE')">

               </button>

               <button class="ikona ikonaspain" :class="{active:activelanguage=='SP'}"  @click="setLanguage('SP')">

               </button>
           </div>
       </div>


<tester></tester>

</div>
@endsection
