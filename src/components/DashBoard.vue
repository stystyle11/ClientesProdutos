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
        <v-row justify="center">
          <v-col
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <!-- Main content -->

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

            <ChartComponent
              v-if="arrayGraficoNomeProdutosZerados.length == 6"
              label="Quantidade / Produto"
              :graphData="arrayGraficoNomeProdutosZerados"
              :labels="arrayGraficoDataProdutosZerados"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChartComponent from '@/components/ChartBaseComponent.vue';

export default {
  components: {
    ChartComponent,
  },

  data() {
    return {
      drawer: true,
      miniVariant: false,
      produtos: [],
      produtosQuantidade10: [],
      produtosZerados: [],

      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Messages', icon: 'mdi-email' },
        { title: 'Settings', icon: 'mdi-settings' },
      ],
      produtosApi: [],
      clientesCadastrados: [],
    };
  },
  computed: {
    arrayGraficoNomeProdutosZerados() {
      console.log(
        'problem',
        this.produtosZerados.map((item) => item.nome)
      );
      return this.produtosZerados.map((item) => item.nome);
    },
    arrayGraficoDataProdutosZerados() {
      console.log(
        'problem2',
        this.produtosZerados.map((item) => item.data)
      );
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
      return 4;
    },
    getColunas() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return 12;
      }
      return 4;
    },
    getMargin() {
      if (this.$vuetify.breakpoint.mdOnly) {
        return 'mr-6 mb-12';
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        return 'mr-8 mb-12';
      } else {
        return 'mb-12';
      }
    },
  },

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    async fetchData() {
      try {
        const response = await fetch('http://localhost:3400/produtos');
        const data = await response.json();

        this.produtos = data;
        this.sortOArrayProdutosZerados();
        this.sortOArrayDescending();
      } catch (error) {
        console.error('Erro dados:', error);
      }
    },
    sortOArrayDescending() {
      this.produtos.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);

      this.produtosQuantidade10 = this.produtos.slice(0, 10);
    },
    sortOArrayProdutosZerados() {
      console.log('produtoszerados', this.produtos);

      this.produtosZerados = this.produtos.filter(
        (item) => item.quantidadeEstoque === 0
      );
      console.log(this.produtosZerados);
    },
  },

  created() {
    this.fetchData();
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
