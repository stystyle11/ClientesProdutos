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
        lg="6"
        xl="8"
        class="graphColumn"
      >
        <v-form
          @submit.prevent="handleSubmit"
          outlined
          color="primary"
          class="formClass"
        >
          <h4 class="title"
            >{{
              this.$route.params.id !== undefined ? 'Editar' : 'Acrescentar'
            }}
            Cliente</h4
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
              <div class="error-message">{{ formErrors.nome }}</div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-mask="'###-###-###-##'"
                v-model="formData.cpfOuCnpj"
                label="CPF / CNPJ"
              ></v-text-field>
              <div class="error-message">{{ formErrors.cpfOuCnpj }}</div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.email"
                label="Email"
              ></v-text-field>
              <div class="error-message">{{ formErrors.email }}</div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-mask="'(##) ####-####'"
                v-model="formData.telefone"
                label="Telefone"
              ></v-text-field>
              <div class="error-message">{{ formErrors.telefone }}</div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.idUsuario"
                id="idSomente"
                label="Id do Usuário"
              ></v-text-field>
              <div class="error-message">{{ formErrors.idUsuario }}</div>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            color="primary"
            class="mt-12"
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
        nome: '',
        cpfOuCnpj: '',
        email: '',
        telefone: '',
        idUsuario: '',
      },
      formErrors: {},
    };
  },

  methods: {
    showToast() {
      let condition =
        this.$route.params.id !== undefined ? 'editado' : 'adicionado';
      this.$toasted.show(`Item ${condition} com sucesso!`, {
        duration: 3000, // Duration in milliseconds
        position: 'top-center', // Toast position (top-left, top-right, bottom-left, bottom-right)
        type: 'success', // Toast type (success, error, info, warn)
      });
    },
    clearMask(field) {
      return field.replace(/\D/g, '');
    },

    handleSubmit() {
      this.formErrors = {};
      this.formData.cpfOuCnpj = this.clearMask(this.formData.cpfOuCnpj);
      this.formData.telefone = this.clearMask(this.formData.telefone);
      if (this.$route.params.id !== undefined) {
        const clienteId = parseInt(this.$route.params.id, 10);
        this.formData.dataCadastro = 'default';

        this.formData.id = clienteId;
      }

      const validationResult = this.checkForm();
      if (!validationResult.isValid) {
        this.formErrors = validationResult.errors;

        return;
      } else {
        this.formData.dataCadastro = new Date().toISOString();

        this.submitForm();
      }
    },
    checkForm() {
      const errors = {};

      for (const field in this.formData) {
        if (this.formData[field].length === 0) {
          errors[field] = `Este campo está vazio`;
        } else {
          const regex = /[!#$%^&*()_+\-=[\]{};':"\\|,<>/?]+/;

          if (regex.test(this.formData[field])) {
            errors[field] = `Este campo contém caracteres não permitidos`;
          }
        }
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors: errors,
      };
    },
    async submitForm() {
      let requestMethod = 'POST';
      let url = 'http://localhost:3400/clientes';

      if (this.$route.params.id !== undefined) {
        requestMethod = 'PUT';
        url = `http://localhost:3400/clientes/${this.$route.params.id}`;
      }

      try {
        const response = await fetch(url, {
          method: requestMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.showToast();
        this.$router.push('/clientes');
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    },

    async getDataPromise() {
      const dataResult = await Promise.allSettled([
        this.$store.dispatch('fetchClientes'),
      ]);

      if (dataResult.status === 'rejected') {
        console.log(dataResult.reason);
      } else {
        if (this.$route.params.id !== undefined) {
          const clienteId = parseInt(this.$route.params.id, 10);
          this.formData = this.$store.getters.getClienteById(clienteId);
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

  box-shadow: inset 0 4px 8px rgba(151, 151, 151, 0.3);
}
.error-message {
  color: red;

  font-size: 14px;
}
.title {
  margin-bottom: 1.5em;
}
</style>
