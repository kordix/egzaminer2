<template>
<div class="">
    <p>Dodaj słówko</p>
    <label for="">Pytanie (po polsku)</label>
    <input type="text" name="" v-model="question">
    <label for="">Odpowiedź (po obcemu)</label>
    <input type="text" name="" v-model="answer">
    <label for="">Rodzajnik</label>
    <select class="" name="" v-model="rodzajnik">
        <option value="">der</option>
        <option value="">die</option>
        <option value="">das</option>
    </select>
    <button type="button" name="button" class="btn btn-primary" @click="add">Zatwierdź</button>
</div>

</template>

<script>
export default {
    data(){
        return {
            question:'',
            answer:'',
            rodzajnik:''
        }
    },
    methods:{
        add(){
            console.log('add');
            let self = this;
            axios.post('add',{'question':this.question,'answer':this.answer}).then((res)=>console.log(res));
        }
    }

}
</script>

<style>

</style>
