<template>
<div class="col-md-6">
  <sets></sets>
      <tester v-if="activeobszar=='egzaminer'"></tester>
  <lista v-show="activeobszar=='list'"></lista>
  <add v-show="activeobszar=='add'"></add>
  <tags v-show="activeobszar=='tags'"></tags>
  <categoriser v-show="activeobszar=='categoriser'"></categoriser>

</div>
</template>

<script>
export default {
    props:['activeobszar','instanceid']
}
</script>

<style lang="css">
</style>
