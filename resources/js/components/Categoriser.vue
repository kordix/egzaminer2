<template>
  <div class="col-md-4">
    <label for="">Counterset:</label> <input type="number" v-model.number="counterset2" name="" value="" @input="setcounterset">
    <!-- <button type="button" name="button" @click="setCounter">Ustaw</button> -->
    <div class="" v-for="category in categories" @click="setCategory(category.id)">
        <span :class="{bold:category.id == currentcategory}"> {{category.name}}</span>
        <span>{{$store.state.words.filter((el)=>el.counter <= counterset2).filter((el)=>el.category_id == category.id).length}}</span>
        <span> / </span>
        <span>{{$store.state.words.filter((el)=>el.category_id == category.id).length}}</span>
    </div>
    <p style="width:300px"><button  class="btn btn-sm btn-secondary" @click="showcasebool = !showcasebool" style="float:right;display:block">+</button></p>
    <div class="" id="listagen" style="overflow-y:auto;height:300px">

            <div style="display:flex" v-for="item in wordsFilter" @click="$store.state.currentQuestion=item">
                <p  :class="{red:item.showcase=='1'}"  style="margin:0px;padding:0px" @click="currentQuestion=item">{{item.question}} - {{item.counter}}</p>
                <button type="button" name="button" class="unfocus" style="width:15px;height:15px;padding:0px;line-height:12px;margin-left:5px;border-radius:5px;background:#FFBBBB" v-if="showcasebool" @click="setShowcase(item.id)">+</button>

            </div>
    </div>

</div>

</template>

<script>
export default {
  data(){
    return {
      counterset2:5,
      category:{},
      showcasebool:false,
      // categories:[],
      // currentcategory:4
    }
  },
  methods:{
    setcounterset(event){
      console.log(event);
      // this.$store.state.counterset = parseInt(val.data);
    },
    setCategory(id){
      this.$store.state.currentcategory=id;
      localStorage.currentcategory=id;
      window.next();
    }
  },
  mounted(){
    if(localStorage.currentcategory){
      this.setCategory(localStorage.currentcategory);


    }
  },
  computed:{
    wordsFilter(){
          if(typeof(this.$store.state.words)=='undefined' || typeof(this.$store.state.currentcategory)=='undefined'){
              return {}
          }else{
              return this.$store.state.words.filter((el)=>el.counter <= this.counterset2).filter((el)=>el.category_id == this.currentcategory)
          }
      },
      categories(){
        return this.$store.state.categories ? this.$store.state.categories : [];
      },
      currentcategory(){
        return this.$store.state.currentcategory ? this.$store.state.currentcategory : '';
      }
  }

}

</script>

<style scoped>
.bold{
  font-weight:bold;
}

.red{
  color:red;
}
</style>
