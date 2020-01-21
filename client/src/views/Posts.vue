<template>
  <v-container>
    <v-layout text-center wrap>Posts</v-layout>
  </v-container>
</template>

<script>
import loadPosts from '../resources/loadPosts.js'

export default {
  name: 'Posts',
  data: () => ({
    posts: []
  }),
  async mounted() {
    const result = await loadPosts()
    this.posts = result
  }
}
</script>

<style scoped>
</style>
