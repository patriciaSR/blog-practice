<template>
  <v-btn color="orange" max-width="150" text @click="goTo()">{{btnText}}</v-btn>
</template>

<script>
export default {
  name: 'SecondaryBtn',
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
