<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="sidebar"
      :mini-variant="miniVariant"
    >
      <v-list dense>
        <v-toolbar-title
          class="text-center mb-12 d-flex justify-center align-center"
          style="height: 50px"
          >Menu</v-toolbar-title
        >
        <v-list>
          <router-link
            v-for="item in items"
            :key="item.name"
            :to="{ name: item.route }"
            tag="v-list-item"
            class="list-item"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list>
        <v-list-item
          v-if="$vuetify.breakpoint.mdAndDown"
          @click.stop="toggleDrawer"
        >
          <v-icon style="margin-right: 20px">mdi-arrow-left</v-icon>
          <v-list-item-content>
            <v-list-item-title> Fechar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon
        @change.stop="toggleDrawer"
        @click.stop="toggleDrawer"
        v-if="$vuetify.breakpoint.mdAndDown"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard Empresarial</v-toolbar-title>
    </v-app-bar>

    <v-main
      justify="center"
      class="no-padding"
    >
      <v-container class="no-padding mt-16">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import ButtonComponent from './components/ButtonComponent.vue';
export default {
  name: 'App',
  components: {
    //ButtonComponent,
  },

  data() {
    return {
      drawer: true,
      miniVariant: false,

      items: [
        {
          title: 'Gerenciar Produtos',
          icon: 'mdi-view-dashboard',
          route: 'produtos',
        },
        {
          title: 'Gerenciar Clientes',
          icon: 'mdi-account-circle',
          route: 'clientes',
        },
      ],
    };
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
  padding: 10px;
  margin: auto;
}
.no-padding {
  padding: 0 !important;
}
.list-item {
  display: flex;
  align-items: center;
  padding: 5px;
}
</style>
