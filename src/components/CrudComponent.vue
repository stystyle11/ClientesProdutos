<template>
  <v-container fluid>
    <v-row class="ma-0">
      <v-col
        cols="10"
        md="10"
        :class="['graphColumn', getMargin]"
      ></v-col>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="index"
                >{{ header }}</th
              >
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="index"
            >
              <td
                v-for="(value, key) in item"
                :key="key"
                >{{ value }}</td
              >
              <td>
                <button @click="confirmAction"
                  ><v-icon>mdi-delete</v-icon>Deletar</button
                >
                <v-snackbar
                  v-model="snackbar"
                  :timeout="timeout"
                  :color="color"
                  :top="top"
                  :content-font-size="fontsize"
                >
                  {{ text }}
                  <v-btn
                    text
                    @click="snackbar = false"
                    >Fechar</v-btn
                  >
                </v-snackbar> </td
              ><td>
                <button @click="showToast"
                  >Editar<v-icon>mdi-pencil</v-icon></button
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          <button @click="confirmAction">Perform Action</button>

          <!-- Confirmation dialog -->
          <div
            v-if="showConfirmation"
            class="modal"
          >
            <div class="modal-content">
              <span
                class="close"
                @click="cancelConfirmation"
                >&times;</span
              >
              <p>Are you sure you want to perform this action?</p>
              <button @click="performAction">Yes</button>
              <button @click="cancelConfirmation">No</button>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,

      text: 'Lorem ipsum dolor sit amet',
      vertical: true,
      top: true,
      fontsize: '12rem',
      showConfirmation: false,
    };
  },
  methods: {
    confirmAction() {
      console.log(this.showConfirmation);
      this.showConfirmation = true;
    },
    cancelConfirmation() {
      this.showConfirmation = false;
    },
    performAction() {
      // Perform the action here
      console.log('Action performed!');

      // Close the confirmation dialog
      this.showConfirmation = false;
    },
    editItem(index) {
      // Emit an event or call a method to handle edit action
      this.$emit('edit', index);
    },
    deleteItem(index) {
      // Emit an event or call a method to handle delete action
      this.$emit('delete', index);
    },
    showSnackbar() {
      this.snackbar = true;
    },
    showToast() {
      this.$toasted.show('Hello, this is a toast message!', {
        duration: 3000, // Duration in milliseconds
        position: 'top-right', // Toast position (top-left, top-right, bottom-left, bottom-right)
        type: 'success', // Toast type (success, error, info, warn)
      });
    },
  },

  created() {
    console.log(this.$store.state.clientes.clientes);
  },
};
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
.graphColumn {
  padding: 10px;
  margin: auto;
}
.snackPadrao {
  font-size: 10rem; /* Change font size */
  bottom: 500px; /* Change vertical position */
}
table {
  width: 90%;
  border-collapse: collapse;
  margin: auto;
}
th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
}
th {
  background-color: #f2f2f2;
}
th,
td:last-child {
  text-align: center;
}
button {
  padding: 6px 12px;
  margin: 2px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  position: absolute;
  top: 30%;
  left: 55%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
