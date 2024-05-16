<template>
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
          v-for="item in items"
          :key="item.id"
          @click="getRowIndex(item)"
        >
          <td
            v-for="value in item"
            :key="value.id"
            >{{ value }}

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
                <p>Tem certeza que deseja deletar esse item ?</p>
                <button @click="deleteItem(rowIndex)">Yes</button>
                <button @click="cancelConfirmation">No</button>
              </div>
            </div>
          </td>
          <thead>
            <tr>
              <td>
                <button @click="confirmAction">
                  <v-icon>mdi-delete</v-icon>Deletar
                </button>
              </td>
              <td>
                <button @click="changeToRoute(item)"
                  >Editar<v-icon>mdi-pencil</v-icon></button
                >
              </td>
            </tr>
          </thead>
        </tr>
      </tbody>
      <!-- Confirmation dialog -->
    </table>
  </div>
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
    endPoint: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showConfirmation: false,
      rowIndex: 0,
    };
  },

  methods: {
    changeToRoute(item) {
      let route;

      this.endPoint === 'clientes'
        ? (route = `/editar/cliente/${item.id}`)
        : (route = `/editar/produto/${item.id}`);
      this.$router.push(route);
    },
    getRowIndex(index) {
      this.rowIndex = index.id;
    },
    confirmAction() {
      this.showConfirmation = true;
    },
    cancelConfirmation() {
      this.showConfirmation = false;
    },

    async deleteItem(itemId) {
      try {
        const response = await fetch(
          `http://localhost:3400/${this.endPoint}/${itemId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        this.showToast();
        this.$emit('reload-event');
        this.showConfirmation = false;
      } catch (error) {
        console.error('Error deleting item:', error.message);
      }
    },

    showSnackbar() {
      this.snackbar = true;
    },
    showToast() {
      this.$toasted.show('Item deletado com sucesso!', {
        duration: 3000, // Duration in milliseconds
        position: 'top-center', // Toast position (top-left, top-right, bottom-left, bottom-right)
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
  width: fit-content;
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
  width: 100%;
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
  background-color: rgb(0 0 0 /0.5%);
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
@media (min-width: 1920px) {
  .table-container {
    width: fit-content;
  }
}
</style>
