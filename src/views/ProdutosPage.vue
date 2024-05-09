<template>
  <div>
    <BaseManagement
      :items="this.$store.state.produtos.produtos"
      :headers="this.headers"
      title="Produtos"
      url="fetchProdutos"
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
        'Quantidade',
        'Valor',
        'Data Cadastro',
        'Observação',
        'Data Registro',
      ],
    };
  },
};
</script>

<style scoped></style>
