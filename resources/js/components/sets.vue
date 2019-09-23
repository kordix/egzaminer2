<template>
  <div class="row">
         <div class="col-md-4" style="display:flex">
         <select class="form-control" name="" v-model="activeobszar2" style="width:150px;margin-right:10px" @input="setActiveObszar">
             <option value="egzaminer">Egzaminer</option>
             <option value="list">Lista</option>
             <option value="showcase">Showcase</option>
             <option value="tags">tagi</option>
         </select>
         </div>
         <div class="col-md-4">
             <button class="ikona ikonagerman" :class="{active:activelanguage=='DE'}" @click="setLanguage('DE')">

             </button>

             <button class="ikona ikonaspain" :class="{active:activelanguage=='SP'}"  @click="setLanguage('SP')">

             </button>
         </div>
     </div>

</template>

<script>
export default {
  data(){
    return {
      activeobszar2:'egzaminer'
    }
  },
  methods:{
    setLanguage(arg){
          this.$store.state.activelanguage = arg;
          localStorage.languageset = arg;
          this.$emit('reset');
          },
    setActiveObszar(){
      console.log(this.activeobszar2);
      this.$store.state.activeobszar = this.activeobszar2;
      console.log(this.$store.state.activeobszar);
    }
  },
  computed:{
    activelanguage(){
      return (this.$store.state.activelanguage) ? this.$store.state.activelanguage : {};
    },
    activeobszar(){
      return (this.$store.state.activeobszar) ? this.$store.state.activeobszar : {};
    }
  }
}

</script>


<style scoped>

.ikonaspain{
    background: url(http://egzaminer.kordi.com.pl/images/spain.png);
    background-size: 40px 30px;
    width: 40px;
    height: 30px;
    margin: 10px;
}

.ikonagerman{
    background: url(http://egzaminer.kordi.com.pl/images/germany.png);
    background-size: 40px 30px;
    width: 40px;
    height: 30px;
    margin: 10px;
}

.ikona{
    transition:.5s;
}

.ikona:hover{
    box-shadow: 3px 3px 2px black;
}

.active {
    box-shadow: 0px 0px 3px red;
}

</style>
