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
        :class="['graphColumn', getMargin]"
      >
        <!-- Principal -->
        <h3 class="font-weight-bold mt-8">Gerenciar {{ title }}</h3>
        <v-divider
          width="100%"
          color="primary"
          style="margin-bottom: 2rem"
        ></v-divider>

        <CrudComponent
          :items="this.items"
          :headers="this.headers"
          :endPoint="this.endPoint"
          @reload-event="getDataPromise"
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
    endPoint: {
      type: String,
      required: true,
    },
  },

  computed: {
    //...mapState('clientes', ['clientes']),

    getMargin() {
      if (this.$vuetify.breakpoint.lgAndUp) {
        return 'margin-auto mb-16';
      } else {
        return 'mb-16';
      }
    },
  },
  methods: {
    async getDataPromise() {
      const dataResult = await Promise.allSettled([
        this.$store.dispatch(this.url),
      ]);
      if (dataResult.status === 'rejected') {
        console.log(dataResult.reason);
      }
    },
  },

  created() {
    // this.getDataPromise();
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
