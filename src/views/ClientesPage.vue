<template>
  <div>
    <v-row justify="end">
      <v-col cols="10">
        <div class="cols-10 d-flex justify-end">
          <v-btn
            class="botao"
            color="primary"
            @click="goToRoute"
            >Acrescentar Cliente</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <BaseManagement
      :items="$store.state.clientes.clientes"
      :headers="this.headers"
      title="Clientes"
      url="fetchClientes"
      endPoint="clientes"
    >
    </BaseManagement>
  </div>
</template>

<script>
import BaseManagement from '@/components/BaseManagementComponent';
export default {
  components: {
    BaseManagement,
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
        'Ações',
      ],
    };
  },
  methods: {
    goToRoute() {
      this.$router.push('/adicionar/cliente');
    },
  },
};
</script>

<style scoped>
.botao {
  margin: 36px 0 0 0;
}
</style>
