<template>
  <v-container>
    <v-layout text-center wrap>
      <Hero />

      <WelcomeCard :userStore="userStore" />
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'

import Hero from '../components/Hero'
import WelcomeCard from '../components/WelcomeCard'

export default {
  name: 'Home',
  components: {
    Hero,
    WelcomeCard,
  },
  data: () => ({
    userStore: userStore.state,
  }),
  methods: {
    goToView(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
</style>
