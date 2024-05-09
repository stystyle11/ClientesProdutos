<template>
  <div>
    <BaseManagement
      :items="this.$store.state.produtos.produtos"
      :headers="this.headers"
      title="Produtos"
      url="fetchProdutos"
      endPoint="produtos"
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
        'Observação',
        'Data Cadastro',
        'Ações',
      ],
    };
  },
};
</script>

<style scoped></style>
