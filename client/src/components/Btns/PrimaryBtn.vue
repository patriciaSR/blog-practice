<template>
  <v-btn depressed color="primary" @click="goTo()" max-width="120" class="ma-2">{{btnText}}</v-btn>
</template>

<script>

export default {
  name: 'PrimaryBtn',
  data: () => ({}),
  props: {
    btnText: undefined
  },
  methods: {
    goTo() {
      this.$emit('go-to')
    }
  }
}
</script>

<style scoped>
</style>
