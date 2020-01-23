<template>
  <v-container>
    <v-layout text-left class="d-flex flex-row justify-space-between align-center my-4" wrap>
      <v-card max-width="800" color="secondary">
        <v-card-title class>Lista de posts</v-card-title>
        <v-list-item three-line class="d-block pb-3">
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

      <PrimaryBtn
        v-if="userStore.token"
        btnText="New Post"
        @go-to="goToView('/myprofile/newpost')"
        class="mt-10 align-self-start"
      />
    </v-layout>
  </v-container>
</template>

<script>
import userStore from '../stores/user'

import loadPosts from '../resources/loadPosts.js'

import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'Posts',
  components: {
    PrimaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    posts: []
  }),
  async mounted() {
    const result = await loadPosts()
    this.posts = result
  },
  methods: {
    goToView(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.no-underline {
  text-decoration: none;
}
</style>
