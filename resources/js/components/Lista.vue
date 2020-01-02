<template>
<div class="form-group">
    <div class="myrow my-2" style="margin-left:0px">
        <button type="button" class="btn btn-primary" style="margin-right:10px" name="button" @click="showanswers = !showanswers">Pokaż odpowiedzi</button>
        <p>Wybierz tag:</p>
        <select class="" name="" class="form-control" style="width:200px" v-model="activetag" @change="getQuestionsToTag(activetag)">
            <option v-for="tag in tags" :value="tag.id">{{tag.name}}</option>
        </select>

    </div>

    <div class="row" v-for="question in filteredHeroes" @click="setWord(question.id)" @mousedown="idmousedown=question.id" @mouseup="idmousedown=null" :class="{active:question.id==idmousedown}">
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
            search:null
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
            return heroes
        }
    },
    mounted() {
        this.getTags();
        this.getQuestionsToTag(2);
    },
    methods: {
        ...mapActions({
            setWord: 'setWord'
        }),
        handleMousedownStyling() {
            console.log('handleMousedownStyling');
        },
        getTags() {
            let self = this;
            axios.get('tags').then((res) => self.tags = res.data)
        },
        getQuestionsToTag(id) {
            let self = this;
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
