<template>
  <v-container class="mx-auto d-flex justify-center">
    <v-layout text-left wrap class="d-flex flex-row justify-space-between align-center">
      <div class="mx-auto my-10 v-card">
        <PostList :posts="posts" listTitle="Post List"/>
      </div>

      <PrimaryBtn
        btnText="New Post"
        @go-to="goToView('/myprofile/newpost')"
        class="mt-12 align-self-start"
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
