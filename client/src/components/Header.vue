<template>
  <div>
    <v-app-bar app dark absolute color="#1A237E" height="70">
      <div class="header__container d-flex align-center justify-space-between flex-grow-1">
        <a href="/" class="app-home__link">
          <v-img
            src="../assets/logo-rocket.png"
            alt="Blog Logo"
            contain
            width="100"
            class="blog__logo mr-2"
          />
        </a>
      </div>
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
    </v-app-bar>
    <NavigationMenu @toggle-menu="toggleMenu" :drawer="drawer"/>
  </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu';

export default {
  name: 'Header',
  components: {
    NavigationMenu
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    toggleMenu(isOpen) {
      return this.drawer = isOpen;
    }
  }
};
</script>

<style scoped>
.header__container {
  height: 100%;
}
</style>
