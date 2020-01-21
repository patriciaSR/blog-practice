<template>
  <div>
    <v-app-bar app color="#1A237E" dark absolute height="70">
      <div class="header__container d-flex align-center justify-space-between flex-grow-1">
        <a class="app-home__link" href="/">
          <v-img
            alt="Blog Logo"
            class="blog__logo mr-2"
            contain
            src="../assets/blog-logo-transparent.png"
            width="100"
          />
        </a>
      </div>
    </v-app-bar>
    <NavigationMenu />
  </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu'

export default {
  name: 'Header',

  data: () => ({}),
  components: {
    NavigationMenu
  }
}
</script>

<style scoped>
.header__container {
  height: 100%;
}
</style>
