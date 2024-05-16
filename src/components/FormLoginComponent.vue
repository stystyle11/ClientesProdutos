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
        <form
          @submit.prevent="handleSubmit"
          outlined
          color="primary"
          class="formClass"
        >
          <h4 class="title">Login</h4>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="12"
              lg="12"
            >
              <v-text-field
                v-model="formData.email"
                label="email"
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
                v-model="formData.senha"
                label="senha"
              ></v-text-field>
              <div class="error-message">{{ formErrors.senha }}</div>
            </v-col>
          </v-row>
          <v-btn
            type="submit"
            color="primary"
            class="mt-12"
            >Enviar</v-btn
          >
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        senha: '',
      },
      formErrors: {},
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3400/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //commit('login', user);

        this.$router.push('/dashboard');
      } catch (error) {
        console.error('There was an error submitting the form:', error);
      }
    },
    //this.$store.dispatch('login', this.formData);

    handleSubmit() {
      this.formErrors = {};

      const validationResult = this.checkForm();
      if (!validationResult.isValid) {
        this.formErrors = validationResult.errors;

        return;
      } else {
        this.login();
        //this.submitForm();
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
