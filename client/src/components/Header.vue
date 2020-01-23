<template>
  <div>
    <v-app-bar app color="#1A237E" dark absolute height="70">
      <div class="header__container d-flex align-center justify-space-between flex-grow-1">
        <a class="app-home__link" href="/">
          <v-img
            alt="Blog Logo"
            class="blog__logo mr-2"
            contain
            src="../assets/logo-rocket.png"
            width="100"
          />
        </a>
      </div>
      <v-app-bar-nav-icon @click="toggleMenu(true)"></v-app-bar-nav-icon>
    </v-app-bar>
    <NavigationMenu :isOpen="this.isOpen" @toggle-menu="toggleMenu"/>
  </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu'

export default {
  name: 'Header',

  data: () => ({
    isOpen: false
  }),
  components: {
    NavigationMenu
  },
  methods: {
    toggleMenu(isOpen) {
      return this.isOpen = isOpen
    }
  }
}
</script>

<style scoped>
.header__container {
  height: 100%;
}
</style>
