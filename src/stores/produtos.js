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
      } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
    },
  },
  getters: {
    getProdutos(state) {
      return state.produtos;
    },
    getProdutoById: (state) => (id) => {
      return state.produtos.find((produto) => produto.id === id);
    },
  },
};
