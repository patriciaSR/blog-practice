<template>
  <v-btn depressed color="primary" max-width="120" class="ma-2" @click="goTo()">{{btnText}}</v-btn>
</template>

<script>
export default {
  name: 'PrimaryBtn',
  props: {
    btnText: undefined
  },
  data: () => ({}),
  methods: {
    goTo() {
      this.$emit('go-to')
    }
  }
}
</script>

<style scoped>
</style>
