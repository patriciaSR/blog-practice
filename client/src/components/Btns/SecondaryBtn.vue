<template>
  <v-btn color="orange" @click="goTo()" max-width="150" text>{{btnText}}</v-btn>
</template>

<script>

export default {
  name: 'SecondaryBtn',
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
