<template>
  <div class="form-group">
    <div class="row my-2" style="margin-left:0px">
      <button type="button" class="btn btn-primary" name="button" @click="showanswers = !showanswers">Pokaż odpowiedzi</button>

    </div>

<p v-for="question in words">{{question.question}} <span v-if="showanswers==true">- {{question.answer}} </span> </p>
</div>

</template>

<script>
export default {
  data(){
    return {
      showanswers:false
    }
  },
  computed:{
    words(){
      return this.$store.state.words
    }
  }
}

</script>
