<template>
  <div>
    <BaseManagement
      :items="this.$store.state.clientes.clientes"
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
};
</script>

<style scoped></style>
