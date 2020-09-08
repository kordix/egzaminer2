
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      count: 0,
      errors: [],
      words: [],
      // wordsall: [],
      currentQuestion: {},
      // currentcategory: 4,
      counterset: 2,
      countermode: '<',
      categories: [],
      activelanguage: 'DE',
      activeobszar: 'egzaminer',
      activeobszar2: 'categoriser',
      loading: true,
      randomset: 'false',
      randomset2: false,
  
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
        context.commit('', payload);
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
         context.commit('setRandomset',payload);
      }
  
    },
    mutations: {
      setRandomset(state,payload){
        state.randomset =payload
      },
      getSettings(state, data) {
        state.settings = data;
      },
      getWords(state, data) {
        state.wordsall = data.filter((el) => el.language == state.settings.activelanguage);
        state.words = data.filter((el) => el.language == state.settings.activelanguage).filter((el) => el.counter < state.counterset);
        if (state.words.length < 1) { console.log('skończyły się słówka store'); state.errors.push('Skończyły się słówka - zmień counter, kategorię albo dodaj nowe'); return };
        
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
        if (state.randomset === 'true') {
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

  export default store;