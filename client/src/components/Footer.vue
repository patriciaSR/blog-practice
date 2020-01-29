<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo darken-4 white--text text-center" width="100%">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.class"
          icon
          :href="icon.url"
          target="_blank"
          class="mx-4 white--text"
        >
          <v-icon size="24px">{{ icon.class }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <a
          href="https://github.com/patriciaSR"
          target="_blank"
          class="github__link secondary--text"
        >
          <strong>@patriciaSR</strong>
        </a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
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
.github__link {
  text-decoration: none;
}
strong:hover {
  color: #5c6bc0;
}
</style>
