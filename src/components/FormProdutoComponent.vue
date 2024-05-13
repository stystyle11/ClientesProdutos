<template>
  <v-container
    fluid
    :style="{
      marginLeft: $vuetify.breakpoint.lgOnly ? '10%' : '0',
    }"
  >
    <v-row class="ma-0 mt-0">
      <v-col
        cols="12"
        sm="12"
        lg="10"
        xl="8"
        class="graphColumn"
      >
        <v-form
          @submit.prevent="submitForm"
          outlined
          color="primary"
          class="formClass"
        >
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.nome"
                label="Nome"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.valor"
                label="Valor"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.quantidadeEstoque"
                label="Quantidade Estoque"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.observacao"
                label="Observacao"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            color="primary"
            >Enviar</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        id: '',
        nome: '',
        quantidadeEstoque: '',
        valor: '',
        observacao: '',
      },
    };
  },

  methods: {
    handleSubmit() {
      // Handle form submission
    },
    async getDataPromise() {
      const dataResult = await Promise.allSettled([
        this.$store.dispatch('fetchProdutos'),
      ]);

      if (dataResult.status === 'rejected') {
        console.log(dataResult.reason);
      } else {
        if (this.$route.params.id !== undefined) {
          this.formData =
            this.$store.state.produtos.produtos[this.$route.params.id];
        } else {
          this.formData = '';
        }
      }
    },
  },
  created() {
    this.getDataPromise();
  },
};
</script>

<style scoped>
.formClass {
  padding: 2em;
}
.graphColumn {
  margin: auto;
}
</style>
