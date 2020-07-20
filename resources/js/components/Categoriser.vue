<template>
<div class="col-md-4">
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

    <p v-for="tag in tags" style="margin:0px">{{tag.name}}  {{words.filter((el)=>el.tags == tag.name).length}} </p>

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
            categories: ['rzeczownik', 'czasownik', 'przymiotnik', 'przyimek', 'zwroty'],
            category: {},
            showcasebool: false,
            tags:[]
        }
    },
    methods: {
        ...mapActions([
            'setCategory'
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
            'words','wordsall', 'counterset',
        ]),
        currentcategory() {
            return this.$store.state.settings.currentcategory;
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
</style>
