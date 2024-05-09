import Vue from 'vue';
import VueRouter from 'vue-router';
////import Home from './views/Produtos.vue';
import About from '@/components/DashBoard.vue';
import Clientes from '@/views/ClientesPage.vue';
import Produtos from '@/views/ProdutosPage.vue';
Vue.use(VueRouter);

const routes = [
  //{ path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/clientes', component: Clientes },
  { path: '/produtos', component: Produtos },
];

const router = new VueRouter({
  mode: 'history', // Enable HTML5 History mode
  routes,
});

export default router;
