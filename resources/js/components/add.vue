<template>
  <div class>
    <p v-for="elem in messages" :key="elem">{{elem}}</p>

    <p>Dodaj słówko</p>
    <div v-if="chosenTagObj.name=='rzeczowniki'">
    <label for v-if="chosentag=='2'">Rodzajnik</label>
    <select class name v-model="rodzajnik" >
      <option value="der">der</option>
      <option value="die">die</option>
      <option value="das">das</option>
    </select>
    </div>
    <div class="row">
        <div class="col-md-9" v-if="reversed">
            <label for>Odpowiedź (po obcemu)</label>
            <input type="text" name v-model="answer" />
            <br />
            <label for>Pytanie (po polsku)</label>
            <input type="text" name v-model="question" />
        </div>
        <div class="col-md-9" v-else>
            <label for>Pytanie (po polsku)</label>
            <input type="text" name v-model="question" />
            <br />
            <label for>Odpowiedź (po obcemu)</label>
            <input type="text" name v-model="answer" />
        </div>
        <div class="col-md-3">
            <button @click="reversed=!reversed">reverse</button>
        </div>
    </div>

   
    <div style="display:flex;margin-bottom:5px">
      <p style="margin-right:10px">Tag:</p>
      <select class name v-model="chosentag" style="margin-right:10px">
        <option :value="tag.id" :key="tag.id" v-for="tag in tags">{{tag.name}}</option>
      </select>
    </div>

    <button type="button" name="button" class="btn btn-primary" @click="add">Zatwierdź</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            question:'',
            answer:'',
            rodzajnik:'',
            tags:[],
            chosentag:1,
            messages:[],
            reversed:true
        }
    },
    methods:{
        add(){
            let self = this;
            axios.post('add',{'question':this.question,'answer':this.answer,'rodzajnik':this.rodzajnik, 'tag_id':this.chosentag }).then((res)=>console.log(res));
            this.messages.push('dodano pytanie ('+this.question+') ');
            this.question='';
            this.answer='';

        },
        getTags(){
            let self = this;
            axios.get('tags').then((res)=>self.tags=res.data)
        },
    },
    mounted(){
        this.getTags();
    },
    computed:{
        chosenTagObj(){
            if(this.tags.find((el)=>el.id==this.chosentag)){
                return this.tags.find((el)=>el.id==this.chosentag)
            }else{
                return {}
            }

        }
    }

}
</script>

<style>
</style>
