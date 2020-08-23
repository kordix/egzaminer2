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

const store = new Vuex.Store({
  state: {
    count: 0,
    errors: [],
    words: [],
    wordsall: [],
    currentQuestion: {},
    // currentcategory: 4,
    counterset: 2,
    countermode: '<',
    categories: [],
    activelanguage: 'DE',
    activeobszar: 'egzaminer',
    activeobszar2: 'categoriser',
    loading: true,
    randomset: false,
    settings: {}
  },
  actions: {
    loadData({
      commit
    }) {
      axios.get('/all').then((response) => {
        commit('getWords', response.data);
        commit('changeLoadingState', false);
        commit('getWord');
      });
    },
    getSettings({
      commit
    }) {
      axios.get('/settings').then((response) => {
        commit('getSettings', response.data);
      });
    },

    setWord(context, id) {
      context.commit('setWord', id)
    },
    setCounterMode(context, payload) {
      context.commit('setCounterMode', payload);
    },
    setCounterSet(context, payload) {
      context.commit('setCounterSet', payload);
    },
    setCategory(context, payload) {
      context.commit('setCategory', payload);
      location.reload();
    },
    setTag(context, payload) {
      context.commit('setTag', payload);
      location.reload();
    },
    setLanguage(context, payload) {
      context.commit('setLanguage', payload);
      context.dispatch('loadData');
    },
    setRandomset(context, payload) {
      // context.commit('setRandomset',payload);
    }

  },
  mutations: {
    // setRandomset(state,payload){
    //   state.randomset = payload
    // },
    getSettings(state, data) {
      state.settings = data;
    },
    getWords(state, data) {
      state.wordsall = data.filter((el) => el.language == state.settings.activelanguage);
      state.words = data.filter((el) => el.language == state.settings.activelanguage).filter((el) => el.counter < state.counterset);
      if (state.words.length < 1) { console.log('skończyły się słówka'); state.errors.push('Skończyły się słówka - zmień counter, kategorię albo dodaj nowe'); return };
      
      if (state.settings.currentcategory) {
        state.words = state.words.filter((el) => el.partofspeech == state.settings.currentcategory)
      }

      if (state.settings.currenttag) {
        state.words = state.words.filter((el) => el.tags == state.settings.currenttag)
      }



    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
    getWord(state) {
      if (state.randomset == 'true') {
        let count = state.words.length
        let num = Math.floor(Math.random() * count);
        console.log(num);

        state.currentQuestion = state.words[num];
      } else {
        state.currentQuestion = state.words[0];
      }

      // state.currentQuestion = state.words.find((el) => el.counter <= state.counterset);
    },
    setWord(state, id) {
      state.currentQuestion = state.words.find((el) => el.id == id);

      // axios.get('/getquestion/'+id).then((res)=>state.currentQuestion=res.data);
    },
    getCategories(state, data) {
      state.categories = data;
    },
    setCounterMode(state, payload) {
      state.countermode = payload;
    },
    setCounterSet(state, payload) {
      state.counterset = payload;
    },
    setLanguage(state, payload) {
      state.settings.activelanguage = payload;
    },
    setCategory(state, payload) {
      axios.patch('updatecategory', { currentcategory: payload });
    },
    setTag(state, payload) {
      console.log(payload, 'setTag payload');
      axios.patch('updatetag', { currenttag: payload });
    }
  }

})

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  // localStorage.setItem('store', JSON.stringify(state));
  localStorage.setItem('counterset', state.counterset);
  localStorage.setItem('activeobszar', state.activeobszar);
  localStorage.setItem('activeobszar2', state.activeobszar2);
  // localStorage.setItem('randomset', state.randomset);
});

const app = new Vue({
  el: '#app',
  computed: Vuex.mapState(['words', 'loading']),
  store,

  created() {
    let self = this;
    if (localStorage.counterset) {
      this.$store.state.counterset = parseInt(localStorage.getItem('counterset'));
    }
    this.$store.dispatch('getSettings'); // dispatch loading
    // setTimeout(function () {
    //   self.$store.dispatch('loadData');

    // }, 1000);

    if (localStorage.getItem('activeobszar')) {
      this.$store.state.activeobszar = localStorage.getItem('activeobszar');
    }

    if (localStorage.getItem('randomset')) {
      // this.$store.dispatch('setRandomset',localStorage.getItem('randomset'));
    }
    // dispatch loading
  },
  methods: {
    setLanguage(lang) {
      this.$store.dispatch('setLanguage', lang);
      let self = this;
      console.log(self.$store.state.settings.activelanguage);

      axios.patch('/updatesetting', { activelanguage: self.$store.state.settings.activelanguage }).then((res) => location.reload());
    }
  }
})
