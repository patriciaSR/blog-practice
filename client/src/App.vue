<template>
  <v-app class="app">
    <v-toolbar app color="#1A237E" dark class="d-flex align-center">
      <div class="d-flex align-center">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <a class="app-home__link" href="/">
          <v-img
            alt="Blog Logo"
            class="blog__logo mr-2"
            contain
            src="./assets/blog-logo-transparent.png"
            width="100"
          />
        </a>
      </div>
    </v-toolbar>

    <v-content>
      <HelloWorld />
    </v-content>

    <v-footer dark padless>
      <v-card flat tile class="indigo darken-4 white--text text-center" width="100%">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon  :href="icon.url" target="_blanck">
            <v-icon size="24px">{{ icon.class }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <a href="https://github.com/patriciaSR" class="github__link secondary--text" ><strong>@patriciaSR</strong></a>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    icons: [
      {
        class: 'fab fa-facebook',
        url: 'https://www.facebook.com/'
      },
      {
        class: 'fab fa-twitter',
        url: 'https://twitter.com/'
      },
      {
        class: 'fab fa-linkedin',
        url: 'https://www.linkedin.com/'
      },
      {
        class: 'fab fa-instagram',
        url: 'https://www.instagram.com/'
      }
    ]
  })
}
</script>

<style>
#app {
  height: 100vh;
  background-color: #5C6BC0;
  color: #E8EAF6;
}
.github__link {
  text-decoration: none;
}
strong:hover {
  color: #5C6BC0;
}
</style>
