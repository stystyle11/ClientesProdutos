<template>
  <div>
    <v-row justify="end">
      <v-col cols="10">
        <div class="cols-10 d-flex justify-end">
          <v-btn
            class="botao"
            color="primary"
            @click="goToRoute"
            >Acrescentar Produto</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <BaseManagement
      :items="$store.state.produtos.produtos"
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
        'Valor',
        'Quantidade',
        'Observação',
        'Data Cadastro',
        'Ações',
      ],
    };
  },
  methods: {
    goToRoute() {
      this.$router.push('/adicionar/produto');
    },
  },
};
</script>

<style scoped>
.botao {
  margin: 36px 0 0 0;
}
</style>
