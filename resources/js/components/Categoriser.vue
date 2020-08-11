<template>
<div >
    <p class="myheader">Części mowy:</p>
    <div class="" v-for="category in categories" @click="setCategory(category)">
        <p style="margin:0px" :class="{active:category==currentcategory}">
            <span :class="{bold:category.id == currentcategory}"> {{category}}</span>
            <span>{{words.filter((el)=>el.partofspeech == category).length}}</span>
            <span> / </span>
            <span>{{wordsall.filter((el)=>el.partofspeech == category).length}}</span>
        </p>
    </div>

    <br>
    <br>
    <p class="myheader">Kategorie tematyczne:</p>
    <p v-for="tag in tags" style="margin:0px" @click="setTag(tag.name)" :class="{active:tag.name==currenttag}">{{tag.name}}  {{wordsall.filter((el)=>el.tags == tag.name).length}} </p>
    <br>
    <p style="margin-bottom:0px" class="myheader">Aktualnie w puli:</p>
    <p v-for="word in words" style="margin-bottom:0px" :class="{active:word.id==currentQuestion.id}">{{word.question}}</p>

    <!-- <p style="width:300px"><button  class="btn btn-sm btn-secondary" @click="showcasebool = !showcasebool" style="float:right;display:block">+</button></p>
    <div class="" id="listagen" style="overflow-y:auto;height:300px">

            <div style="display:flex" v-for="item in wordsFilter" @click="$store.state.currentQuestion=item">
                <p  :class="{red:item.showcase=='1'}"  style="margin:0px;padding:0px" @click="currentQuestion=item">{{item.question}} - {{item.counter}}</p>
                <button type="button" name="button" class="unfocus" style="width:15px;height:15px;padding:0px;line-height:12px;margin-left:5px;border-radius:5px;background:#FFBBBB" v-if="showcasebool" @click="setShowcase(item.id)">+</button>

            </div>
    </div> -->

</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import {
    mapState
} from 'vuex';

export default {
    data() {
        return {
            categories: ['rzeczownik', 'czasownik', 'przymiotnik', 'przyimek', 'zwroty','nieprzypisane'],
            category: {},
            showcasebool: false,
            tags:[]
        }
    },
    methods: {
        ...mapActions([
            'setCategory','setTag'
        ]),
        getTags() {
            let self = this;
            axios.get('tags').then((res) => self.tags = res.data)
        },
    },
    mounted() {
      this.getTags();

    },
    computed: {
        ...mapState([
            'words','wordsall', 'counterset','currentQuestion'
        ]),
        currentcategory() {
            return this.$store.state.settings.currentcategory;
        },
        currenttag() {
            return this.$store.state.settings.currenttag;
        }
    }

}
</script>

<style scoped>
.bold {
    font-weight: bold;
}

.red {
    color: red;
}

.active {
    color: red;
}
p{
    cursor:pointer;
    margin-bottom:2px;
}

.myheader{
    cursor:default;
    font-weight:bold;
}

</style>
