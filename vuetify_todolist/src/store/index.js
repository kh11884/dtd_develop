import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      items: [],
      id: 0
  },
  mutations: {
    addItem (state, item) {
      item.id = state.id;
      state.items.push(item);
      state.id++;
    },
    removeItem (state, id){
      console.log(id);
      state.items = state.items.filter(function (item) {
        return item.id !== id;
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
