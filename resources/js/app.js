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
Vue.component('appinstance', require('./components/Appinstance.vue').default);
Vue.component('app', require('./components/App.vue').default);









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
     counterset:7,
     countermode:'<',
     categories:[],
     activelanguage:'DE',
     activeobszar:'list',
     activeobszar2:'list',
     loading: true,
     randomset:false
   },
   actions: {
     loadData({
       commit
     }) {
       axios.get('/all').then((response) => {
         // console.log(response.data, this)
         commit('getWords', response.data);
         commit('changeLoadingState', false);
         commit('getWord');
       });
       // axios.get('/categories').then((res) => commit('getCategories', res.data));
   },
   setWord(context,id){
       context.commit('setWord',id)
   },
   setCounterMode(context,payload){
       context.commit('setCounterMode',payload);
   },
   setCounterSet(context,payload){
       context.commit('setCounterSet',payload);
   }
   },
   mutations: {
     getWords(state, data) {
         let wordslocal = data.filter((el)=>el.language == state.activelanguage).filter((el)=>el.counter < state.counterset);
         if (wordslocal.length < 1) {console.log('skończyły się słówka'); return};
         console.log(wordslocal);
       state.words = data.filter((el)=>el.language == state.activelanguage).filter((el)=>el.counter < state.counterset);
     },
     changeLoadingState(state, loading) {
       state.loading = loading
     },
     getWord(state){
       if(state.randomset==true){
           let count = state.words.length
           let num = Math.floor(Math.random()*count);
           state.currentQuestion = state.words[num];
       }else {
           state.currentQuestion = state.words[0];
       }

       // state.currentQuestion = state.words.find((el) => el.counter <= state.counterset);
     },
     setWord(state,id){
         console.log(id);
         console.log(state.words.find((el)=>el.id==id));
        state.currentQuestion = state.words.find((el)=>el.id==id);

        // axios.get('/getquestion/'+id).then((res)=>state.currentQuestion=res.data);
     },
     getCategories(state,data){
        state.categories = data;
    },
    setCounterMode(state,payload){
        state.countermode = payload;
    },
    setCounterSet(state,payload){
        state.counterset = payload;
    },
    initialiseStore(state) {
			// Check if the ID exists
			// if(localStorage.getItem('store')) {
			// 	// Replace the state object with the stored item
			// 	this.replaceState(
			// 		Object.assign(state, JSON.parse(localStorage.getItem('store')))
			// 	);
			// }
            // if(localStorage.getItem('counterset')){
            // state.counterset = parseInt(localStorage.getItem('counterset'));
            // }
        }
   }

 })

 store.subscribe((mutation, state) => {
 	// Store the state object as a JSON string
 	// localStorage.setItem('store', JSON.stringify(state));
     localStorage.setItem('counterset',state.counterset);


 });

 const app = new Vue({
   el: '#app',
   computed: Vuex.mapState(['words', 'loading']),
   store,

   created() {
       this.$store.state.counterset = parseInt(localStorage.getItem('counterset'));
     this.$store.dispatch('loadData') // dispatch loading
   }
 })
