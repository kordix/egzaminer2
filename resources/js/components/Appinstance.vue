<template>
<div class="col-md-6">
  <sets></sets>
      <tester v-show="activeobszar=='egzaminer'"></tester>
  <lista v-show="activeobszar=='list'"></lista>
  <add v-show="activeobszar=='add'"></add>
  <tags v-show="activeobszar=='tags'"></tags>
</div>
</template>

<script>
export default {
    props:['activeobszar']
}
</script>

<style lang="css">
</style>
