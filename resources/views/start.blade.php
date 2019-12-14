@extends('layouts.app')

@section('content')
  <div class="container">


<sets></sets>
<div class="row" v-if="$store.state.activeobszar=='egzaminer'">
    <tester></tester>

    {{-- <form class="" action="/add" method="post">
        {{csrf_field()}}
        <label for="">question</label>
        <input type="text" name="question" value="">
        <label for="">answer</label>
        <input type="text" name="answer" value="">

        <button type="submit" name="button">submit</button>

    </form> --}}



{{-- <categoriser></categoriser> --}}
</div>
<lista v-if="$store.state.activeobszar=='list'"></lista>
<add v-if="$store.state.activeobszar=='add'"></add>
<tags v-if="$store.state.activeobszar=='tags'"></tags>


</div>
@endsection
