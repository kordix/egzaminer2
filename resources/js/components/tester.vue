<template>
  <div class="col-md-6" id="egzaminer" >
      <div id="error" v-for="error in errors" v-html="error"></div>
      <p><b> Przetłumacz:</b> {{currentQuestion.question}} </p>
      <p>Counter: {{currentQuestion.counter}}  <span style="font-size:8px">id: {{currentQuestion.id}}</span></p>
      <label for="answer">Odpowiedź:</label>
      <form action="" @submit="answerm">
          <div class="form-group">
              <input style="width:250px" class="form-control" id="answerinput" type="text" v-model="answer" placeholder="odpowiedź" :disabled="disabledInput" autocomplete="off">
          </div>
          <div class="form-group">
              <button class="btn btn-primary" @click="answerm" id="answerbutton">answer</button>
          </div>

          <div class="form-group">
           <button type="button" class="btn btn-success" name="button" @click="plusCounter" >Counter +1</button>
           <button type="button" class="btn btn-success" name="button" @click="plusCounter5" >Counter +5</button>
           <button type="button" class="btn btn-success" name="button" @click="plusCounter0" >Zresetuj</button>
       </div>

       <div class="form-group">
           <button id="nextbutton" type="button" class="btn btn-success" @click="next">Dalej</button>
           <button id="prevbutton" type="button" class="btn btn-secondary" @click="prev">Prev</button>
           <button id="editbutton"  type="button" class="btn btn-secondary" style="margin-left:20px" @click="editbool=!editbool">Edytuj</button>
           <button id="deletebutton" type="button" class="btn btn-danger" style="margin-left:20px" @click="deleteQuestion">Usuń</button>


       </div>

      </form>
      <div class="" v-if="editbool">
          <div class="form-group">
            <label for="">Kategoria</label>
            <select class="" name="" v-model="currentQuestion.category_id">
              <option v-for="category in categories" :value="category.id" >{{category.name}}</option>
            </select>
          </div>

          <div class="form-group" >
              <label for="">Pytanie po polsku</label>
              <input type="text" name="question"  :value="currentQuestion.question">
          </div>
          <div class="form-group" v-if="currentQuestion.category_id=='2'">
            <label for="" >Rodzajnik</label>
            <input type="text" name="rodzajnik" :value="currentQuestion.rodzajnik">
          </div>
          <div class="form-group">
              <label for="">Odpowiedź <span v-if="activelanguage=='DE'">po niemiecku</span><span v-else>po hiszpańsku</span>  </label>
              <input type="text" name="answer" :value="currentQuestion.answer">
          </div>
          <div class="form-group">
              <button @click="update" type="button" class="btn btn-primary" name="button">Zatwierdź</button>
              <button @click="reverse" type="button" name="button" class="btn btn-warning">Reverse</button>
          </div>

       </div>

      <p>To do: </p>
        <ul>
            <li>konta</li>
            <li>komponenty</li>
            <li>dodaj</li>
            <li>tagi</li>
            <li>collins babla szukanie</li>
            <li>powtarzanie prevent</li>
            <li>odpowiednik w innym języku</li>
            <li>podobne, alfabetycznie</li>
            <li>bez kategorii</li>
            <li>losowe</li>
            <li>przełączanie kategorii auto</li>
            <li>zdania</li>
            <li>statystyki</li>
            <li>konta</li>
            <li>Counterset  > </li>
        </ul>

  </div>


</template>

<script>
export default {
  data(){
    return {
      errors:[],
      answer:'',
      disabledInput:false,
      editbool:false,
      wordcategory:''
    }
  },
  methods:{
    answerm(e){
      e.preventDefault();
      if (this.answer.escapeDiacritics().toLowerCase() == this.$store.state.currentQuestion.answer.escapeDiacritics().toLowerCase() && this.answer !='' ) {
             this.disabledInput = true;
             this.errors.push(`<b>Dobrze!</b> Można przejść do następnego pytania (Odpowiedź: ${this.$store.state.currentQuestion.answer})` );
             this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter++;
             axios.patch(`/counterquestion/${this.currentQuestion.id}`);
             setTimeout(function() {
                 document.getElementById('nextbutton').focus();
             }, 200);

         } else {
             // axios.patch(`/counterquestion/${this.currentQuestion.id}`);
             this.disabledInput = true;
             this.errors.push(`Nie udało się. Prawidłowa odpowiedź: <b> <span v-if="currentQuestion.category_id=='2'">${this.currentQuestion.rodzajnik}</span> ${this.currentQuestion.answer} </b>`);
             setTimeout(function() {
                 document.getElementById('nextbutton').focus();
             }, 200);
         }
    },
    plusCounter(){
            this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter++;
            axios.patch(`/counterquestion/${this.currentQuestion.id}`);
            this.next();
        },
    plusCounter5(){
        this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter+=5;
        axios.patch(`/counterquestion5/${this.currentQuestion.id}`);
        this.next();
    },
    plusCounter0(){
        this.$store.state.find((el)=>el.id==this.$store.state.currentQuestion.id).counter=0;
        axios.patch(`/counterquestion0/${this.currentQuestion.id}`);
        this.next();
    },
    next:function() {
          this.errors = [];
          let self = this;
          this.disabledInput = false;
          this.answer = '';
          let elem = this.$store.state.words.filter((el)=>el.counter <= this.$store.state.counterset).filter((el)=>el.category_id == this.$store.state.currentcategory).find((el) => el.id > this.$store.state.currentQuestion.id);

          if (typeof(elem) == 'undefined') {
              this.start();
              return
          }

          this.$store.state.currentQuestion = elem;
          setTimeout(function() {
              self.focusanswer();
          }, 200)
          // document.getElementById('answerinput').focus();

          // this.getCurrent();
      },
      prev(){
          let elem = this.$store.state.words.filter((el)=>el.counter <= this.$store.state.counterset).filter((el)=>el.category_id == this.$store.state.currentcategory).filter((el) => el.id < this.$store.state.currentQuestion.id).slice(-1)[0];
          if(elem) {this.$store.state.currentQuestion = elem}else{console.log('brak prev')}
      },
      deleteQuestion(){
          let self = this;
          axios.delete(`/delete/${self.currentQuestion.id}`);
          this.next();
      },

      start:function(){
        console.log('od nowa');
      },
      focusanswer() {
            try{
            document.getElementById('answerinput').focus()
        }catch(e){
            console.log(e.message);
        }
      },
      update(){
        let self = this;
        axios.patch(`updatequestion/${this.currentQuestion.id}`, {question:self.currentQuestion.question,answer:self.currentQuestion.answer,rodzajnik:self.currentQuestion.rodzajnik })
      },
      formprevent(e){
        e.preventdefault()
      },
      reverse(){
        let answer = this.currentQuestion.answer;
        let question = this.currentQuestion.question;

        this.$store.state.currentQuestion.answer = question;
        this.$store.state.currentQuestion.question = answer;


      }
  },
  created(){
    let self = this;
    window.events.$on(
                'next', function(){
                  self.next();
                }
            );
  },
  computed:{
    currentQuestion(){
      return (this.$store.state.currentQuestion) ? this.$store.state.currentQuestion : {};
    },
    activelanguage(){
      return (this.$store.state.activelanguage) ? (this.$store.state.activelanguage) : '';
    },
    categories(){
      return this.$store.state.categories ? this.$store.state.categories : [];
    },
  }
}


</script>

<style scoped>
.bold{
    font-weight:bold;
}

.red{
    color:red;
    /* background:red; */
    /* background-color:red; */
}


.unfocus:focus{
    outline:none;
}

</style>
