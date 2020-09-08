<template>
<div class="col-md-6">
  <sets></sets>
      <tester v-if="activeobszar=='egzaminer'"></tester>
  <lista v-if="activeobszar=='list'"></lista>
  <add v-if="activeobszar=='add'"></add>
  <tags v-if="activeobszar=='tags'"></tags>
  <categoriser v-if="activeobszar=='categoriser'"></categoriser>

</div>
</template>

<script>
export default {
    props:['activeobszar','instanceid']
}
</script>

<style lang="css">
</style>
