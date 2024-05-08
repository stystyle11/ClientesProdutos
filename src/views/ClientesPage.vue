<!-- Home.vue -->
<template>
  <v-container
    fluid
    :style="{
      marginLeft: $vuetify.breakpoint.lgOnly ? '10%' : '0',
    }"
  >
    <v-row class="ma-0 mt-4">
      <v-col
        :cols="getColunas"
        :md="getMds"
        style="height: 400px"
        :class="['graphColumn', getMargin]"
      >
        <!-- Principal -->
        <h3 class="font-weight-bold">Gerenciar Clientes</h3>
        <v-divider
          width="100%"
          color="primary"
          style="margin-bottom: 2rem"
        ></v-divider>

        <CrudComponent
          :items="this.$store.state.clientes.clientes"
          :headers="this.headers"
        >
        </CrudComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudComponent from '@/components/CrudComponent';
//import { mapState } from 'vuex';
//import { mapGetters } from 'vuex';
export default {
  components: {
    CrudComponent,
  },
  data() {
    return {
      headers: [
        'ID',
        'Nome',
        'CPF',
        'Email',
        'Telefone',
        'idUsuario',
        'Data Registro',
      ],
    };
  },
  computed: {
    //...mapState('clientes', ['clientes']),
    getMds() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 12;
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return 14;
      } else {
        return 10;
      }
    },
    getColunas() {
      if (this.$vuetify.breakpoint.mdOnly) {
        return 14;
      }
      return 14;
    },
    getMargin() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 'margin-auto mb-16';
      } else {
        return 'mb-16';
      }
    },
  },
  methods: {
    async getDataPromisse() {
      const userResult = await Promise.allSettled([
        this.$store.dispatch('fetchClientes'),
      ]);
      if (userResult.status === 'rejected') {
        console.log(userResult.reason);
      }
    },
  },

  created() {
    this.getDataPromisse();
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
  margin-bottom: 5em;
}
.no-padding {
  padding: 0 !important;
}
</style>
