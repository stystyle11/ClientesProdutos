<template>
  <v-container
    fluid
    :style="{
      marginLeft: $vuetify.breakpoint.lgOnly ? '10%' : '0',
    }"
  >
    <v-row class="ma-0 mt-4">
      <v-col
        :cols="getColunas"
        :md="getMds"
        style="height: 400px"
        :class="['graphColumn', getMargin]"
      >
        <!-- Principal -->
        <h3 class="font-weight-bold">Gerenciar {{ title }}</h3>
        <v-divider
          width="100%"
          color="primary"
          style="margin-bottom: 2rem"
        ></v-divider>

        <CrudComponent
          :items="this.items"
          :headers="this.headers"
          @custom-event="handleEvent"
        >
        </CrudComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CrudComponent from '@/components/CrudComponent';
//import { mapState } from 'vuex';
//import { mapGetters } from 'vuex';
export default {
  components: {
    CrudComponent,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    //...mapState('clientes', ['clientes']),
    getMds() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 12;
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return 14;
      } else {
        return 10;
      }
    },
    getColunas() {
      if (this.$vuetify.breakpoint.mdOnly) {
        return 14;
      }
      return 14;
    },
    getMargin() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 'margin-auto mb-16';
      } else {
        return 'mb-16';
      }
    },
  },
  methods: {
    handleEvent(data) {
      console.log('Received data:', data);
      if (data === 'valor') {
        alert(data);
      } else {
        alert('outro dado');
      }
      // Handle the emitted event here
    },
    async getDataPromisse() {
      const dataResult = await Promise.allSettled([
        this.$store.dispatch(this.url),
      ]);
      if (dataResult.status === 'rejected') {
        console.log(dataResult.reason);
      }
    },
  },

  created() {
    this.getDataPromisse();
  },
};
</script>

<style scoped>
.graphColumn {
  padding: 10px;
  margin: auto;
  margin-bottom: 5em;
}
.no-padding {
  padding: 0 !important;
}
</style>
