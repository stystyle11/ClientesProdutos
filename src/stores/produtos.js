// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    produtos: [],
  },
  mutations: {
    SET_PRODUTOS(state, produtos) {
      state.produtos = produtos;
    },
  },
  actions: {
    async fetchProdutos({ commit }) {
      try {
        const response = await fetch('http://localhost:3400/produtos');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        commit('SET_PRODUTOS', data);

        console.log('do vuex', data);
      } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
    },
  },
  getters: {
    getProdutos(state) {
      console.log('retornando do vuex produtos', state.produtos);
      return state.produtos;
    },
  },
};
