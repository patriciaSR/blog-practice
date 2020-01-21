<template>
  <v-container>
    <v-layout text-left class="d-flex flex-column align-center mx-5">
      <v-card max-width="800" tile color="secondary">
        <v-card-title class>Lista de posts</v-card-title>
        <v-list-item three-line class="d-block">
          <v-card
            class="mx-1 my-3 px-2"
            max-width="800"
            tile
            v-for="post in posts"
            :key="post._id"
            :id="post._id"
          >
            <router-link :to="'/posts/' + post._id" class="no-underline">
              <v-list-item-content>
                <v-list-item-title class="mb-2">{{post.title}}</v-list-item-title>
                <v-list-item-subtitle class="caption">{{post.date}}</v-list-item-subtitle>
                <v-list-item-subtitle class="mt-2">{{post.content}}</v-list-item-subtitle>
              </v-list-item-content>
            </router-link>
          </v-card>
        </v-list-item>
      </v-card>
    </v-layout>
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
  .no-underline {
    text-decoration: none;
  }
</style>
