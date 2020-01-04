import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    id: 0
  },
  mutations: {
    addItem(state, item) {
      item.id = state.id;
      state.items.push(item);
      state.id++;
    },
    removeItem(state, id) {
      state.items = state.items.filter(function (item) {
        return item.id !== id;
      });
    },
    changeItem(state, changedItem) {
      var result = state.items.find(function (item) {
        return item.id === changedItem.id;
      });
      result.text = changedItem.text;
    },
  },
  actions: {},
  modules: {}
});
