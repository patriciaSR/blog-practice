<template>
  <v-app class="app">
    <Header />

    <v-content>
      <router-view />
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header'
// import Home from './views/Home'
import Footer from './components/Footer'

export default {
  name: 'App',

  components: {
    Header,
    // Home,
    Footer
  },

  data: () => ({

  })
}
</script>

<style>
  #app {
    height: 100vh;
    background-color: #5c6bc0;
    color: #e8eaf6;
  }
</style>
