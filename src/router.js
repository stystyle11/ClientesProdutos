import Vue from 'vue';
import VueRouter from 'vue-router';

import DashBoard from '@/components/DashBoard.vue';
import Clientes from '@/views/ClientesPage.vue';
import Produtos from '@/views/ProdutosPage.vue';
import store from '@/stores';

import FormClienteComponent from './components/FormClienteComponent.vue';
import FormProdutoComponent from './components/FormProdutoComponent.vue';
import LoginPage from './components/FormLoginComponent.vue';
Vue.use(VueRouter);

const routes = [
  { path: '/', component: DashBoard },
  { path: '/dashboard', component: DashBoard },
  { path: '/clientes', name: 'clientes', component: Clientes },
  { path: '/produtos', name: 'produtos', component: Produtos },
  { path: '/editar/cliente/:id', component: FormClienteComponent, props: true },
  { path: '/adicionar/cliente', component: FormClienteComponent, props: false },
  { path: '/editar/produto/:id', component: FormProdutoComponent, props: true },
  { path: '/adicionar/produto', component: FormProdutoComponent, props: false },
  { path: '/login', component: LoginPage, props: false },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
