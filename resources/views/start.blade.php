@extends('layouts.app')

@section('content')
  <div class="container">


<sets></sets>
<div class="row" v-if="$store.state.activeobszar=='egzaminer'">
<tester></tester>
{{-- <categoriser></categoriser> --}}
</div>
{{-- <lista v-if="$store.state.activeobszar=='list'"></lista> --}}
<add v-if="$store.state.activeobszar=='add'"></add>



</div>
@endsection
