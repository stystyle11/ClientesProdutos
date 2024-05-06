// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import produtosModulo from './produtos';
import clientesModulo from './clientes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    produtos: produtosModulo,
    clientes: clientesModulo,
  },
});
