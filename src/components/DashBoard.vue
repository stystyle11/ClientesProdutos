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
