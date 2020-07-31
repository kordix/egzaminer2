<template>
<div class="form-group">
    <div class="myrow my-2" style="margin-left:0px">
        <button type="button" class="btn btn-primary" style="margin-right:10px" name="button" @click="showanswers = !showanswers">Pokaż odpowiedzi</button>
        <p>Wybierz tag:</p>
        <select name="" class="form-control" style="width:200px" v-model="activetag">
            <option value="0">Wszystkie</option>
            <option v-for="tag in tags" :key="tag.id" :value="tag.name">{{tag.name}}</option>
        </select>

    </div>

    <div v-if="filterBy=='name'" class="row" v-for="question in filteredHeroes" :key="question.id" @click="setWord(question.id)" @mousedown="idmousedown=question.id" @mouseup="idmousedown=null" :class="{active:question.id==idmousedown}">
        <div class="col-4">
            {{question.question}} <span style="font-size:6px">id: {{question.id}}</span>

        </div>
        <div class="col-4">
            <b>{{question.rodzajnik}}</b> {{question.answer}}
        </div>
        <div class="col-1">
            {{question.counter}}
        </div>
    </div>
    <div v-if="filterBy=='tag'" class="row" v-for="question in words2" :key="question.id" @click="setWord(question.id)" @mousedown="idmousedown=question.id" @mouseup="idmousedown=null" :class="{active:question.id==idmousedown}">
        <div class="col-4">
            {{question.question}}<span style="font-size:6px">id: {{question.id}}</span>

        </div>
        <div class="col-4">
            <b>{{question.rodzajnik}}</b> {{question.answer}}
        </div>
        <div class="col-1">
            {{question.counter}}
        </div>
    </div>

    <div class="myrow my-3">
        <p>Szukaj:</p>
        <input type="text" name="" v-model="search" class="form-control" style="height:1.6em;display:inline-block;width:200px;">

    </div>

</div>
</template>

<script>
import {
    mapActions
} from 'vuex';

export default {
    data() {
        return {
            showanswers: false,
            tags: null,
            words2: null,
            activetag: null,
            idmousedown: null,
            search:null,
            filterBy:'name'
        }
    },
    computed: {
        words() {
            return this.$store.state.words
        },
        test(){
            return 'dupa';
        },
        filteredHeroes: function() {
            let self = this;
            var sortKey = '';
            var filterkeydump = this.search;
            var filterKey = filterkeydump && filterkeydump.toLowerCase()
            var order =  1;
            var heroes = this.words;
            if (filterKey) {
                heroes = heroes.filter(function(row) {
                    return Object.keys(row).some(function(key) {
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                    })
                })
            }
            if (sortKey) {
                heroes = heroes.slice().sort(function(a, b) {
                    a = a[sortKey]
                    b = b[sortKey]
                    return (a === b ? 0 : a > b ? 1 : -1) * order
                })
            }

            if(this.activetag){
                return heroes.filter((el)=>el.tags == self.activetag)
            }else{
            return heroes
            }
        }
    },
    mounted() {
        this.loadData();
        this.getTags();
    },
    methods: {
        ...mapActions({
            setWord: 'setWord',
            loadData:'loadData'
        }),
        handleMousedownStyling() {
        },
        getTags() {
            let self = this;
            axios.get('tags').then((res) => self.tags = res.data)
        },
        getQuestionsToTag(id) {
            console.log('getquestionstotag');
            
            if(id==0){
                location.reload();
                return;
            }
            let self = this;
            this.filterBy='tag';
            axios.get('questionstotag/' + id).then((res) => this.words2 = res.data);
        }
    }
}
</script>

<style scoped>
.myrow{
    display:flex;
    flex-wrap: wrap;
}

.row:hover {
    color: red
}

p:active {
    background: green;
}

.active {
    background: red;
}
</style>
