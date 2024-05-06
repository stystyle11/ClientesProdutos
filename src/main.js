import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router'; // Import the router configuration
import store from './stores'; // Import Vuex store
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
