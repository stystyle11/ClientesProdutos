<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="sidebar"
      :mini-variant="miniVariant"
    >
      <v-list
        @click.stop="toggleDrawer"
        dense
      >
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @change.stop="toggleDrawer"
        @click.stop="toggleDrawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Gerenciador Produtos</v-toolbar-title>
    </v-app-bar>

    <v-main
      justify="center"
      class="no-padding"
    >
      <v-container fluid>
        <v-row
          justify="center"
          class="ma-0"
        >
          <v-col
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <!-- Main content -->
            <h3 class="font-weight-bold">Produtos maior Estoque</h3>
            <v-divider
              width="90%"
              color="primary"
              style="margin-bottom: 2rem"
            ></v-divider>
            <ChartComponent
              v-if="arrayGrafico10QuantidadeProdutos.length == 10"
              label="Quantidade / Produto"
              :graphData="arrayGrafico10QuantidadeProdutos"
              :labels="arrayGrafico10NomeProdutos"
            />
          </v-col>

          <v-col
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <!-- Main content -->
            <h3 class="font-weight-bold">Produtos Zerados</h3>
            <v-divider
              width="90%"
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
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <v-card class="elevation-10 rounded-lg">
              <v-card-title class="text-center">Totçe</v-card-title>
              <v-card-text class="text-center">
                <v-icon size="48">icone</v-icon>
              </v-card-text>
              <v-card-text class="text-center">descricao</v-card-text>
            </v-card>
          </v-col>
          <v-col
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <v-card class="elevation-10 rounded-lg">
              <v-card-title class="text-center">Totçe</v-card-title>
              <v-card-text class="text-center">
                <v-icon size="48">icone</v-icon>
              </v-card-text>
              <v-card-text class="text-center">descricao</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChartComponent from '@/components/ChartBaseComponent.vue';

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

      clientesCadastrados: [],
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
    getMds() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return 10;
      }
      return 5;
    },
    getColunas() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return 12;
      }
      return 5;
    },
    getMargin() {
      if (this.$vuetify.breakpoint.mdOnly) {
        return 'mr-6 mb-16';
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        return 'mr-8 mb-16';
      } else {
        return 'mb-16';
      }
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
    fetchUsers2() {},
    ...mapActions(['fetchItems']), // Map fetchItems action to component methods

    async getDataPromisse() {
      const [userResult, userCategory] = await Promise.allSettled([
        this.$store.dispatch('fetchClientes'),
        this.$store.dispatch('fetchProdutos'),
        //this.fetchData(),
        //this.fetchUsers2(),
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
    // this.$store.dispatch('fetchProdutos');

    this.getDataPromisse();
    //this.fetchData();
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #f5f5f5;
}
.graphColumn {
  border-right: 1px solid #ccc;
  padding: 10px;
}
.no-padding {
  padding: 0 !important;
}
</style>
