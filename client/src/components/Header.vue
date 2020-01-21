<template>
  <v-app-bar app color="#1A237E" dark>
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
      <v-app-bar-nav-icon class="align-self-end"></v-app-bar-nav-icon>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({})
}
</script>

<style scoped>
  .header__container {
    height: 100%;
  }
</style>
