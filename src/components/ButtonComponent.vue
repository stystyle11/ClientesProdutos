<template>
  <!--<v-btn @click="navigateToRoute"> </v-btn>-->
  <button @click="navigateToRoute"> </button>
</template>

<script>
export default {
  props: {
    routeName: String,
  },
  methods: {
    navigateToRoute() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>
