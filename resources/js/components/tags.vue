<template>
<div class="mt-2">
<p v-for="tag in tags">{{tag.name}} <span style="font-size:8px"> id:{{tag.id}}</span> <span @click="deleteTag(tag.id)" style="color:red"> (usuń)</span></p>

<input type="text" name="" v-model="taginput"> <button type="button" class="btn btn-primary" name="button" @click="addTag">Dodaj tag</button>


<!-- <ul>
    <li v-for="elem in tagpivot.filter((el)=>el.tag_id == activetag)">{{words2.find((el)=>el.id==elem.question_id).question}} - {{words2.find((el)=>el.id==elem.question_id).answer}}</li>
</ul> -->

</div>
</template>

<script type="text/javascript">
    export default {
        data(){
            return {
                tags:null,
                activetag:null,
                taginput:null
            }
        },
        methods:{
            addTag(){
                let self = this;
                console.log(self.taginput);
                axios.post('/addtag',{'name':self.taginput}).then((res)=>self.getTags());
            },
            getTags(){
                let self = this;
                axios.get('tags').then((res)=>self.tags=res.data)
            },
            deleteTag(id){
                let self = this;
                axios.delete('deletetag/'+id).then((res)=>self.getTags());
            }
        },
        created(){
            this.getTags();
        }
    }

</script>
