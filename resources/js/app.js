/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


import Vuex from 'vuex';
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
Vue.component('tester', require('./components/tester.vue').default);
Vue.component('sets', require('./components/sets.vue').default);
Vue.component('categoriser', require('./components/Categoriser.vue').default);
Vue.component('lista', require('./components/Lista.vue').default);
Vue.component('add', require('./components/Add.vue').default);
Vue.component('tags', require('./components/Tags.vue').default);







/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 const store = new Vuex.Store({
   state: {
     count:0,
     errors:[],
     words: [],
     currentQuestion:{},
     currentcategory:4,
     counterset:5,
     categories:[],
     activelanguage:'DE',
     activeobszar:'egzaminer',
     loading: true
   },
   actions: {
     loadData({
       commit
     }) {
       console.log('loaddata');
       axios.get('/all').then((response) => {
         // console.log(response.data, this)
         commit('getWords', response.data);
         commit('changeLoadingState', false);
         commit('getWord');
       });
       // axios.get('/categories').then((res) => commit('getCategories', res.data));
     }
   },
   mutations: {
     getWords(state, data) {
         // state.words=['asdf','afds'];
       state.words = data.filter((el)=>el.language == state.activelanguage);
     },
     changeLoadingState(state, loading) {
       state.loading = loading
     },
     getWord(state){
       // console.log(state.currentcategory);
       state.currentQuestion = state.words[0];
       // state.currentQuestion = state.words.find((el) => el.counter <= state.counterset);
     },
     getCategories(state,data){
        state.categories = data;
     }
   }

 })

 const app = new Vue({
   el: '#app',
   computed: Vuex.mapState(['words', 'loading']),
   store,
   created() {
     //console.log(this.$store)
     this.$store.dispatch('loadData') // dispatch loading
   }
 })
