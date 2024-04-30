<template>
    <v-app>
      <v-navigation-drawer app v-model="drawer" class="sidebar" :mini-variant="miniVariant" >
        <v-list @click.stop="toggleDrawer" dense>
          <v-list-item-group >
            <v-list-item v-for="(item, index) in items" :key="index" link>
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
        <v-app-bar-nav-icon @change.stop="toggleDrawer"  v-if="$vuetify.breakpoint.mdAndDown" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Gerenciador Produtos</v-toolbar-title>
      </v-app-bar>
  
      <v-content>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="3" class="sidebar">
              <!-- Sidebar content -->
            </v-col>
            <v-col cols="12" md="9">
              <!-- Main content -->
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: true, // Initially open the sidebar
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
  </style>
  