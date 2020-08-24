<template>
  <div class="row">
    <select
      class="form-control"
      name
      v-model="activeobszar2"
      style="width:150px;margin-right:10px"
      @change="setActiveObszar"
    >
      <option value="egzaminer">Egzaminer</option>
      <option value="list">Lista</option>
      <option value="tags">tagi</option>
      <option value="add">dodaj</option>
      <option value="categoriser">categoriser</option>
    </select>

    <div style="display:flex" v-if="$parent.instanceid == 1">
    <p style="margin-bottom:0px;line-height:2rem;">Counterset:</p>

    <select name class="mr-1" @change="setCounterMode">
      <option value="<"><</option>
      <option value=">">></option>
    </select>
    <select class name v-model="counterset" @change="setCounterSet">
      <option v-for="n in 10">{{n}}</option>
    </select>
    <button type="button" name="button" @click="reload">Ustaw</button>
    </div>
    <p>Random:</p>      

    <!-- <div class="col-md-4">
             <button class="ikona ikonagerman" :class="{active:activelanguage=='DE'}" @click="setLanguage('DE')"> </button>
             <button class="ikona ikonaspain" :class="{active:activelanguage=='SP'}"  @click="setLanguage('SP')"> </button>
    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeobszar2: "egzaminer",
      countermode: "<",
      counterset: 5,
      randomsetlocal: 0
    };
  },
  methods: {
    setLanguage(arg) {
      this.$store.state.activelanguage = arg;
      localStorage.languageset = arg;
      this.$emit("reset");
    },
    setActiveObszar(val) {
      if (this.$parent.instanceid == "2") {
        this.$store.state.activeobszar2 = this.activeobszar2;
        localStorage.activeobszar2 = this.activeobszar2;
      } else {
        this.$store.state.activeobszar = this.activeobszar2;
        localStorage.activeobszar = this.activeobszar2;
      }
    },
    setCounterMode() {
      let self = this;
      this.$store.dispatch("setCounterMode", self.countermode);
    },
    setCounterSet() {
      let self = this;

      this.$store.dispatch("setCounterSet", self.counterset);
    },
    reload() {
      location.reload();
    }
  },
  computed: {
    activelanguage() {
      return this.$store.state.activelanguage
        ? this.$store.state.activelanguage
        : {};
    },
    activeobszar() {
      return this.$store.state.activeobszar
        ? this.$store.state.activeobszar
        : {};
    }
  },
  mounted() {
    if(this.$store.state.randomset === 'true'){
    this.randomsetlocal = true;
    }else{
      this.randomsetlocal = false;
    }

    this.counterset = this.$store.state.counterset;

    if (this.$parent.instanceid == "2" && localStorage.activeobszar2) {
      this.activeobszar2 = localStorage.activeobszar2;
    } else if (this.$parent.instanceid == "1" && localStorage.activeobszar) {
      this.activeobszar2 = localStorage.activeobszar;
    }
  }
};
</script>


<style scoped>
.ikonaspain {
  background: url(http://egzaminer.kordi.com.pl/images/spain.png);
  background-size: 40px 30px;
  width: 40px;
  height: 30px;
  margin: 10px;
}

.ikonagerman {
  background: url(http://egzaminer.kordi.com.pl/images/germany.png);
  background-size: 40px 30px;
  width: 40px;
  height: 30px;
  margin: 10px;
}

.ikona {
  transition: 0.5s;
}

.ikona:hover {
  box-shadow: 3px 3px 2px black;
}

.active {
  box-shadow: 0px 0px 3px red;
}
</style>
