<template>
  <div  id="egzaminer" >
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
          <div class="form-group" >
              <label for="">Pytanie po polsku</label>
              <input type="text" id="editQquestion"  name="question"  :value="currentQuestion.question">
          </div>
          <div class="form-group" v-if="chosentag=='2'">
            <label for="" >Rodzajnik</label>
            <input type="text" name="rodzajnik" :value="currentQuestion.rodzajnik">
          </div>
          <div class="form-group">
              <label for="">Odpowiedź <span v-if="activelanguage=='DE'">po niemiecku</span><span v-else>po hiszpańsku</span>  </label>
              <input type="text" name="answer" id="editQanswer" :value="currentQuestion.answer">
          </div>
          <div class="form-group">
              <button @click="update" type="button" class="btn btn-primary" name="button">Zatwierdź</button>
              <button @click="reverse" type="button" name="button" class="btn btn-warning">Reverse</button>
          </div>

       </div>
       <div class="" id="tagstoquestion" style="margin-bottom:5px;display:flex">
           <div class="" style="position:relative;margin-right:4px;" v-for="elem in tagstoquestion">
               <button class="btn-sm btn-primary tag" >{{elem.name}}</button>
               <div @click="deletetag(elem)" class="closer" style="position:absolute;width:10px;height:10px;background:red;top:-2px;right:0px;border-radius:2em;"><span></span></div>
           </div>
       </div>

       <div class="" style="display:flex">
           <p @click="addTagToQuestion" style="margin-right:10px">Dodaj tag:</p>
           <select class="" name="" v-model="chosentag" style="margin-right:10px">
               <option :value="tag.id" v-for="tag in tags">{{tag.name}}</option>
           </select>
           <button  @click="addTagToQuestion" type="button" class="btn-sm btn-default" name="button">Dodaj</button>
       </div>


      <p>To do: </p>
        <ul>
            <li>nauka wg tagu</li>
            <li>synonimy beunruhigen änstigen</li>
            <li>Counterset  > </li>
            <li>przełączanie tagów auto</li>
            <li>collins babla szukanie</li>
            <li>odpowiednik w innym języku</li>
            <li>podobne, alfabetycznie</li>
            <li>losowe</li>
            <li>zdania</li>
            <li>statystyki</li>
        </ul>

  </div>


</template>

<script>
import {mapState} from 'vuex';


export default {
  data(){
    return {
      errors:[],
      answer:'',
      disabledInput:false,
      editbool:false,
      wordcategory:'',
      tags:null,
      tagstoquestion:null,
      chosentag:{}
    }
  },
  methods:{
      addTagToQuestion(elem){
          console.log('ADDRAGTOQUETON');
        let self = this;
        axios.post('/addtagtoquestion/'+self.currentQuestion.id+'/'+self.chosentag).then((res)=>self.getTagsToQuestion())
      },
      deletetag(elem){
          let self = this;
        axios.delete('/deletetagtoquestion/'+elem.question_id+'/'+elem.tag_id).then((res)=>self.getTagsToQuestion())
      },
      getTags(){
          let self = this;
          axios.get('tags').then((res)=>self.tags=res.data)
      },
      getTagsToQuestion(){
          let self = this;
          axios.get('tagstoquestion/'+self.$store.state.currentQuestion.id).then((res)=>self.tagstoquestion=res.data)
      },
    answerm(e){
      e.preventDefault();
      console.log('answerm');

      if(this.currentQuestion.rodzajnik.length>1 ){
          console.log('rodzajnik');
          if (this.answer.escapeDiacritics().toLowerCase() == this.currentQuestion.rodzajnik+' '+this.currentQuestion.answer.escapeDiacritics().toLowerCase() && this.answer !='' ) {
              this.answerPositive();
          }else{
              this.answerNegative();
          }
      }else {
          console.log('else');
          if (this.answer.escapeDiacritics().toLowerCase() == this.currentQuestion.answer.escapeDiacritics().toLowerCase()){
              this.answerPositive();
          }else {
              this.answerNegative();

          }

      }
    },
    answerPositive(){
        this.disabledInput = true;
        this.errors.push(`<b>Dobrze!</b> Można przejść do następnego pytania (Odpowiedź:<b>${this.$store.state.currentQuestion.rodzajnik}</b> ${this.$store.state.currentQuestion.answer})` );
        this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter++;
        axios.patch(`/updatequestion2/${this.currentQuestion.id}`,{counter:this.currentQuestion.counter+1});
        setTimeout(function() {
            document.getElementById('nextbutton').focus();
        }, 200);
    },
    answerNegative(){
        this.disabledInput = true;
        this.errors.push(`Nie udało się. Prawidłowa odpowiedź: <b> <span v-if="currentQuestion.category_id=='2'">${this.currentQuestion.rodzajnik}</span> ${this.currentQuestion.answer} </b>`);
        setTimeout(function() {
            document.getElementById('nextbutton').focus();
        }, 200);
    },
    plusCounter(){
            this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter++;
            axios.patch(`/counterquestion/${this.currentQuestion.question_id}`);
            this.next();
        },
    plusCounter5(){
        this.$store.state.words.find((el)=>el.id==this.$store.state.currentQuestion.id).counter+=5;
        axios.patch(`/updatequestion2/${this.currentQuestion.id}`,{counter:this.currentQuestion.counter});
        this.next();
    },
    plusCounter0(){
        this.$store.state.find((el)=>el.id==this.$store.state.currentQuestion.id).counter=0;
        axios.patch(`/counterquestion0/${this.currentQuestion.question_id}`);
        this.next();
    },
    next:function() {
          this.errors = [];
          let self = this;
          this.disabledInput = false;
          this.answer = '';
          let elem = this.$store.state.words.filter((el)=>el.counter <= this.$store.state.counterset).find((el) => el.id > this.$store.state.currentQuestion.id);

          if (typeof(elem) == 'undefined') {
              this.start();
              return
          }


          this.$store.state.currentQuestion = elem;
          this.getTagsToQuestion();

          setTimeout(function() {
              self.focusanswer();
          }, 200)
          // document.getElementById('answerinput').focus();

          // this.getCurrent();
      },
      prev(){
          let elem = this.$store.state.words.filter((el)=>el.counter <= this.$store.state.counterset).filter((el) => el.id < this.$store.state.currentQuestion.id).slice(-1)[0];
          if(elem) {this.$store.state.currentQuestion = elem}else{console.log('brak prev')}
      },
      deleteQuestion(){
          let self = this;
          axios.delete(`/delete/${self.currentQuestion.question_id}`);
          this.next();
      },

      start:function(){
         this.$store.dispatch('loadData');
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
          console.log('update');
        let self = this;
        let editQanswer = document.getElementById('editQanswer').value;
        let editQquestion = document.getElementById('editQquestion').value;

        axios.patch(`updatequestion3/${this.$store.state.currentQuestion.id}`, {'question':editQquestion,'answer':editQanswer,'rodzajnik':self.currentQuestion.rodzajnik })
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
    self.getTags();
    window.events.$on(
                'next', function(){
                  self.next();
                }
            );
  },
  mounted(){
      let self = this;
      setTimeout(function(){
          self.getTagsToQuestion();
      },1000)
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
.closer:hover{
    background:#994444 !important;
}

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
