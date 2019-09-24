<template>
  <div class="">
<button type="button" class="btn btn-primary" name="button" @click="showanswers = !showanswers">Pokaż odpowiedzi</button>

<p v-for="question in words">{{question.question}} <span v-if="showanswers==true">{{question.answer}} </span> </p>
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
