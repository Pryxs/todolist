import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from 'nativescript-localstorage';

//import NSVuexPersistent from 'nativescript-vuex-persistent';

Vue.use(Vuex)

const NSVuexPersistent = store => {
  // Init hook.
  let storageStr = localStorage.getItem('ns-vuex-persistent');
  if (storageStr) {
      store.replaceState(JSON.parse(storageStr))
  }
  store.subscribe((mutation, state) => {
      // Suscribe hook.
      localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
  })
};



export default new Vuex.Store({
 
  state: {
      test: "okey",
      todos:[]
  },
  mutations: {

    saveTodo(state, item){
      state.todos.push(item)
      //alert(state.todos)
    },

    deleteItem(state, index){
      state.todos.splice(index, 1);
    },


  }
  ,
  actions: {}
  ,
  modules: {},
  plugins:[NSVuexPersistent],
})