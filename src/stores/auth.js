// store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    login(state, user) {
      state.isAuthenticated = true;
      state.user = user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        const response = await fetch('http://localhost:3400/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        commit('login', user);

        this.$router.push('/dashboard');
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    // isAuthenticated: (state) => state.isAuthenticated,
    // user: (state) => state.user,
  },
});
