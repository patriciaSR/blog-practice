<template>
  <v-container>
    <v-layout text-left class="d-flex flex-row justify-space-between align-center my-4" wrap>

      <PostList listTitle="Post List" :posts="posts" />

      <PrimaryBtn
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

import PostList from '../components/PostList'
import PrimaryBtn from '../components/Btns/PrimaryBtn'

export default {
  name: 'Posts',
  components: {
    PostList,
    PrimaryBtn
  },
  data: () => ({
    userStore: userStore.state,
    posts: []
  }),
  async mounted() {
    this.posts = await this.getPosts()
  },
  methods: {
    goToView(path) {
      this.$router.push(path)
    },
    async getPosts() {
      const result = await loadPosts()
      return result
    }
  }
}
</script>

<style scoped>
</style>
