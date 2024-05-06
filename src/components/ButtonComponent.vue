<template>
  <button @click="navigateToRoute">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    routeName: String,
    buttonText: String,
  },
  methods: {
    navigateToRoute() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>
