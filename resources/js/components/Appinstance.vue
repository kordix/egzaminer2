<template>
<div class="col-md-6">
  <sets></sets>
      <tester v-if="activeobszar=='egzaminer'"></tester>
  <lista v-if="activeobszar=='list'"></lista>
  <add v-if="activeobszar=='add'"></add>
  <tags v-if="activeobszar=='tags'"></tags>
</div>
</template>

<script>
export default {
    props:['activeobszar']
}
</script>

<style lang="css">
</style>
