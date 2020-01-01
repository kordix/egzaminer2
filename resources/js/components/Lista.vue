<template>
<div class="form-group">
    <div class="row my-2" style="margin-left:0px">
        <button type="button" class="btn btn-primary" style="margin-right:10px" name="button" @click="showanswers = !showanswers">Pokaż odpowiedzi</button>
        <select class="" name="" class="form-control" style="width:200px" v-model="activetag" @change="getQuestionsToTag(activetag)">
            <option v-for="tag in tags" :value="tag.id">{{tag.name}}</option>
        </select>
    </div>

    <div class="row" v-for="question in words2" @click="setWord(question.id)">
        <div class="col-md-4">
            {{question.question}} <span style="font-size:6px">id: {{question.id}}</span>
        </div>
        <div class="col-md-4">
            <b>{{question.rodzajnik}}</b> {{question.answer}}
        </div>
        <div class="col-md-1">
            {{question.counter}}
        </div>
    </div>

</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            showanswers: false,
            tags: null,
            words2:null,
            activetag:null
        }
    },
    computed: {
        words() {
            return this.$store.state.words
        }
    },
    mounted(){
    this.getTags();
    this.getQuestionsToTag(2);
    },
    methods: {
        ...mapActions({
            setWord:'setWord'
        }),
        getTags(){
            let self = this;
            axios.get('tags').then((res)=>self.tags=res.data)
        },
        getQuestionsToTag(id){
            let self = this;
            axios.get('questionstotag/'+id).then((res)=>this.words2=res.data);
        }
    }
}
</script>

<style scoped>
.row:hover{
    color:red
}

</style>
