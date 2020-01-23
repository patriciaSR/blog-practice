<template>
  <v-btn depressed color="primary" @click="goTo()">{{btnText}}</v-btn>
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
.indigo {
  color: #b2ebf2;
  height: 100%;
}
.username {
  color: #1a237e;
  font-weight: bold;
}
</style>
