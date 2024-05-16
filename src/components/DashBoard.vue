v-col<template>
  <v-container fluid>
    <v-row class="mt-4 custom-ml">
      <v-col
        cols="12"
        md="5"
        xl="5"
        style="height: 400px"
        class="mb-8"
      >
        <!-- Main content -->
        <h3 class="font-weight-bold">Produtos maior Estoque</h3>
        <v-divider
          width="100%"
          color="primary"
          style="margin-bottom: 2rem"
        ></v-divider>
        <ChartComponent
          v-if="arrayGrafico10QuantidadeProdutos.length === 10"
          label="Quantidade / Produto"
          :graphData="arrayGrafico10QuantidadeProdutos"
          :labels="arrayGrafico10NomeProdutos"
        />
      </v-col>

      <v-col
        cols="12"
        md="5"
        xl="5"
        style="height: 400px"
        class="mb-8"
      >
        <!-- Main content -->
        <h3 class="font-weight-bold">Produtos Zerados</h3>
        <v-divider
          width="100%"
          color="primary"
          style="margin-bottom: 2rem"
        ></v-divider>
        <ChartComponent
          v-if="arrayGraficoNomeProdutosZerados.length > 1"
          label="Quantidade / Produto"
          :graphData="arrayGraficoNomeProdutosZerados"
          :labels="arrayGraficoDataProdutosZerados"
        />
      </v-col>

      <v-col
        cols="12"
        md="5"
        xl="5"
        style="height: 200px"
      >
        <v-card
          class="elevation-2 rounded-lg mt-12"
          style="width: 100%"
        >
          <v-card-title class="text-center">Produtos cadastrados:</v-card-title>
          <v-card-text class="text-center">
            <v-icon size="48">{{
              $store.state.produtos.produtos.length
            }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="5"
        xl="5"
        style="height: 200px"
      >
        <v-card
          class="elevation-2 rounded-lg mt-12"
          style="width: 100%"
        >
          <v-card-title class="text-center">Clientes cadastrados:</v-card-title>
          <v-card-text class="text-center">
            <v-icon size="48">{{
              $store.state.clientes.clientes.length
            }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChartComponent from '@/components/ChartBaseComponent';
import { mapActions } from 'vuex';

export default {
  components: {
    ChartComponent,
  },
  data() {
    return {
      drawer: true,
      miniVariant: false,
      produtosQuantidade10: [],
      produtosZerados: [],
      shouldHandleProdutosChange: false,
      shouldHandleClientesChange: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Messages', icon: 'mdi-email' },
        { title: 'Settings', icon: 'mdi-settings' },
      ],
    };
  },
  computed: {
    arrayGraficoNomeProdutosZerados() {
      return this.produtosZerados.map((item) => item.nome);
    },
    arrayGraficoDataProdutosZerados() {
      return this.produtosZerados.map((item) => item.nome);
    },
    arrayGrafico10QuantidadeProdutos() {
      return this.produtosQuantidade10.map((item) => item.quantidadeEstoque);
    },
    arrayGrafico10NomeProdutos() {
      return this.produtosQuantidade10.map((item) => item.nome);
    },
  },
  watch: {
    '$store.state.produtos.produtos'(newValue) {
      if (!this.shouldHandleProdutosChange) {
        this.sortOArrayDescending(newValue);
        this.sortOArrayProdutosZerados(newValue);
      }
      this.shouldHandleProdutosChange = true;
    },
    '$store.state.clientes.clientes'(newValue) {
      if (!this.shouldHandleClientesChange) {
        this.clientesCadastrados = newValue;
        console.log('novo cliente', this.clientesCadastrados);
        this.shouldHandleClientesChange = true;
      }
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    ...mapActions(['fetchItems']), // Map fetchItems action to component methods
    async getDataPromisse() {
      const [userResult, userCategory] = await Promise.allSettled([
        this.$store.dispatch('fetchClientes'),
        this.$store.dispatch('fetchProdutos'),
      ]);
      if (userResult.status === 'rejected') {
        console.log(userResult.reason);
      }
      if (userCategory.status === 'rejected') {
        console.log(userResult.reason);
      }
    },
    sortOArrayDescending(arrayProdutos) {
      arrayProdutos.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);
      this.produtosQuantidade10 = arrayProdutos.slice(0, 10);
    },
    sortOArrayProdutosZerados(arrayProdutosZerados) {
      this.produtosZerados = arrayProdutosZerados.filter(
        (item) => item.quantidadeEstoque === 0
      );
    },
  },
  created() {
    this.getDataPromisse();
  },
};
</script>

<style scoped>
.graphColumn {
  padding: 10px;
  margin: auto;
  margin-bottom: 5em;
}
@media (min-width: 1280px) {
  .custom-ml {
    margin-left: 256px; /* Set your desired margin value here */
  }
}
</style>
