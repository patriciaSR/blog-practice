<template>
  <v-app app class="app">
    <Header />

    <v-content>
      <router-view />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import userStore from './stores/user'

import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: () => ({
  }),
  created() {
    this.getLocalData();
  },
  methods: {
    getLocalData() {
      return userStore.getFromLocalStorage()
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  background-color: #5c6bc0;
  color: #e8eaf6;
}
</style>
