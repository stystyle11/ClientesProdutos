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
        <v-toolbar-title
          class="text-center mb-12 d-flex justify-center align-center"
          style="height: 50px"
          >Menu</v-toolbar-title
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
            <ButtonComponent
              routeName="Home"
              buttonText="Go to Home"
            ></ButtonComponent>
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
      <v-container class="no-padding mt-16">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ButtonComponent from './components/ButtonComponent.vue';
export default {
  name: 'App',
  components: {
    ButtonComponent,
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
</style>
