import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  state: {
    clientes: [],
  },
  mutations: {
    SET_CLIENTES(state, clientes) {
      state.clientes = clientes;
    },
  },
  actions: {
    async fetchClientes({ commit }) {
      try {
        const response = await fetch('http://localhost:3400/clientes');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        commit('SET_CLIENTES', data);

        console.log('do vuex clientes', data);
      } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
    },
  },
  getters: {
    getClientes(state) {
      console.log('retornando do vuex CLIENTES', state.clientes);
      return state.clientes;
    },
    getClienteById: (state) => (id) => {
      return state.clientes.find((cliente) => cliente.id === id);
    },
  },
};
