<template>
<div class="">
    <p v-for="elem in messages">{{elem}}</p>

    <p>Dodaj słówko</p>
    <label for="" v-if="chosentag=='2'">Rodzajnik</label>
    <select class="" name="" v-model="rodzajnik" v-if="chosentag=='2'">
        <option value="der">der</option>
        <option value="die">die</option>
        <option value="das">das</option>
    </select>
    <label for="">Odpowiedź (po obcemu)</label>
    <input type="text" name="" v-model="answer">
    <br>
    <label for="">Pytanie (po polsku)</label>
    <input type="text" name="" v-model="question">
    <div style="display:flex;margin-bottom:5px">
        <p style="margin-right:10px">Tag:</p>
        <select class="" name="" v-model="chosentag" style="margin-right:10px">
            <option :value="tag.id" v-for="tag in tags">{{tag.name}}</option>
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
            chosentag:null,
            messages:[]
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
        addTagToQuestion(elem){
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
    },
    mounted(){
        this.getTags();
    }

}
</script>

<style>

</style>
