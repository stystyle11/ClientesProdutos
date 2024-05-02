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
            <ChartComponent />
          </v-col>
          <v-col
            :cols="getColunas"
            :md="getMds"
            style="height: 400px"
            :class="['graphColumn', getMargin]"
          >
            <!-- Main content -->
            <ChartComponent
              label="Grafico teste"
              :graphData="[11, 22, 44, 55, 66]"
              :labels="['Ajenrio', 'Fev', 'March']"
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
        return 'mr-6 mb-6';
      } else if (this.$vuetify.breakpoint.lgAndUp) {
        return 'mr-8 mb-8';
      } else {
        return 'mb-12';
      }
    },
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #f5f5f5;
}
.graphColumn {
  border-right: 1px solid #ccc;
}
.no-padding {
  padding: 0 !important;
}
</style>
