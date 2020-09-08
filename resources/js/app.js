/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import Vuex from 'vuex';
import store from './index';
Vue.use(Vuex);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('tester', require('./components/Tester.vue').default);
Vue.component('sets', require('./components/Sets.vue').default);
Vue.component('categoriser', require('./components/Categoriser.vue').default);
Vue.component('lista', require('./components/Lista.vue').default);
Vue.component('add', require('./components/Add.vue').default);
Vue.component('tags', require('./components/Tags.vue').default);
Vue.component('appinstance', require('./components/Appinstance.vue').default);
Vue.component('app', require('./components/App.vue').default);









/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  // localStorage.setItem('store', JSON.stringify(state));
  localStorage.setItem('counterset', state.counterset);
  localStorage.setItem('activeobszar', state.activeobszar);
  localStorage.setItem('activeobszar2', state.activeobszar2);
  localStorage.setItem('randomset', state.randomset);
});

const app = new Vue({
  el: '#app',
  // computed: Vuex.mapState(['words', 'loading']),
  store,
  data:{
    counterset:5,
    wordsall:[],
    words:[],
    activeobszar:'egzaminer',
    activeobszar2:'egzaminer',

    settings:{
      activelanguage:'SP',
      currentcategory:'',
      currenttag:''
    },
    randomset:'true',
    randomset2: false,
    currentQuestion:{}
  },
  watch:{
    randomset2(val){
      localStorage.randomset2 = val; 
    }
  },
  created() {
    let self = this;
    this.loadData();
    if (localStorage.counterset) {this.counterset = localStorage.getItem('counterset');}
    // this.$store.dispatch('getSettings'); // dispatch loading
    if (localStorage.getItem('activeobszar')) {this.activeobszar = localStorage.getItem('activeobszar')}
    if (localStorage.getItem('randomset')) {this.randomset = localStorage.getItem('randomset')}

      if (localStorage.getItem('randomset2') === 'true'){
        this.randomset2 = true
      }else {
        this.randomset2 = false
      }
     
    

    // dispatch loading
  },
  methods: {
    setLanguage(lang) {
      this.activelanguage = lang;
      let self = this;
      axios.patch('/updatesetting', { activelanguage: self.activelanguage }).then((res) => location.reload());
    },
    async loadData(){
      let self = this;
      await axios.get('/all').then((res)=>self.wordsall = res.data).then((res)=>self.getWords()).then((res)=>self.getWord());
    },
    getWords(state, data) {
      let self = this;
      this.wordsall = this.wordsall.filter((el) => el.language == self.settings.activelanguage);
      this.words = this.wordsall.filter((el) => el.counter < self.counterset);
      if (this.words.length < 1) { console.log('skończyły się słówka'); this.errors.push('Skończyły się słówka - zmień counter, kategorię albo dodaj nowe'); return };
      
      if (this.settings.currentcategory) {
        this.words = this.wordsall.filter((el) => el.partofspeech == self.settings.currentcategory)
      }

      if (this.settings.currenttag) {
        this.words = this.words.filter((el) => el.tags == self.settings.currenttag)
      }

    },
    getWord() {
      if (this.randomset === 'true') {
        let count = this.words.length
        let num = Math.floor(Math.random() * count);
        console.log(num);

        this.currentQuestion = this.words[num];
      } else {
        this.currentQuestion = this.words[0];
      }

      // state.currentQuestion = state.words.find((el) => el.counter <= state.counterset);
    },


  }
})
