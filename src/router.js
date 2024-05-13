import Vue from 'vue';
import VueRouter from 'vue-router';
////import Home from './views/Produtos.vue';
import About from '@/components/DashBoard.vue';
import Clientes from '@/views/ClientesPage.vue';
import Produtos from '@/views/ProdutosPage.vue';
//import ClientesForm from '@/views/FormClientePage.vue';
import FormClienteComponent from './components/FormClienteComponent.vue';
import FormProdutoComponent from './components/FormProdutoComponent.vue';
Vue.use(VueRouter);

const routes = [
  //{ path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/clientes', component: Clientes },
  { path: '/produtos', component: Produtos },
  { path: '/editar/cliente/:id', component: FormClienteComponent, props: true },
  { path: '/adicionar/cliente', component: FormClienteComponent, props: false },
  { path: '/editar/produto/:id', component: FormProdutoComponent, props: true },
  { path: '/adicionar/produto', component: FormProdutoComponent, props: false },
];

const router = new VueRouter({
  mode: 'history', // Enable HTML5 History mode
  routes,
});

export default router;
